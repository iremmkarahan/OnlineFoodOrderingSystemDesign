// src/delivery/delivery.main.ts
import { NestFactory } from '@nestjs/core';
import { DeliveryAppModule } from './delivery.app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DeliveryAppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
        queue: process.env.RABBITMQ_QUEUE || 'orders_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
  console.log('🚀 Delivery microservice is running...');
}

bootstrap();
