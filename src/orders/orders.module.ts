
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { DeliveryModule } from '../delivery/delivery.module';

@Module({
  imports: [
    // Register the Order entity for TypeORM
    TypeOrmModule.forFeature([Order]),

    // Import delivery-related providers (RMQ consumers)
    DeliveryModule,

    // Configure RabbitMQ client to publish events
    ClientsModule.register([
      {
        name: 'ORDERS_PUBLISHER',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
          queue: process.env.RABBITMQ_QUEUE || 'orders_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],

  // REST controller for /orders endpoints
  controllers: [OrdersController],

  // Business logic for orders
  providers: [OrdersService],
})
export class OrdersModule {}
