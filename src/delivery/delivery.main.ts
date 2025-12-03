
import { NestFactory } from '@nestjs/core';
import { DeliveryAppModule } from './delivery.app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

/**
 * Bootstraps the delivery microservice.
 * This service listens to RabbitMQ events from the orders API.
 */
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DeliveryAppModule,
    {
      transport: Transport.RMQ,
      options: {
        // RabbitMQ connection URL (Railway or local)
        urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
        // Queue name to listen to
        queue: process.env.RABBITMQ_QUEUE || 'orders_queue',
        // Keep queue persistent
        queueOptions: { durable: true },
      },
    },
  );

  await app.listen();
  console.log('🚀 Delivery microservice is running...');
}

bootstrap();
