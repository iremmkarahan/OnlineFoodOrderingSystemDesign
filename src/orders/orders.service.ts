import { Injectable, Inject, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  // Logger to show RMQ events in Railway logs
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private ordersRepo: Repository<Order>,

    @Inject('ORDERS_PUBLISHER')
    private client: ClientProxy,
  ) {}

  findAll() {
    return this.ordersRepo.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async create(data: Partial<Order>) {
    const order = this.ordersRepo.create({
      ...data,
      status: 'PENDING',
    });

    const saved = await this.ordersRepo.save(order);

    // 📤 Add log BEFORE sending the event
    this.logger.log(
      `📤 Emitting order_created event → ${JSON.stringify({
        id: saved.id,
        customerName: saved.customerName,
      })}`,
    );

    // Emit event
    void this.client.emit('order_created', {
      id: saved.id,
      customerName: saved.customerName,
      address: saved.address,
      totalPrice: saved.totalPrice,
      status: saved.status,
    });

    return saved;
  }

  async updateStatus(id: number, status: string) {
    const order = await this.findOne(id);
    order.status = status;
    const saved = await this.ordersRepo.save(order);

    // 📤 Add log BEFORE sending the event
    this.logger.log(
      `📤 Emitting order_status_updated event → ${JSON.stringify({
        id: saved.id,
        status: saved.status,
      })}`,
    );

    // Emit status update event
    void this.client.emit('order_status_updated', {
      id: saved.id,
      status: saved.status,
    });

    return saved;
  }
}
