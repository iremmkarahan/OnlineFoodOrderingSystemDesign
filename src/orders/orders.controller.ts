import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: Partial<Order>): Promise<Order> {
    return this.ordersService.create(body);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Order> {
    return this.ordersService.updateStatus(Number(id), status);
  }
}
