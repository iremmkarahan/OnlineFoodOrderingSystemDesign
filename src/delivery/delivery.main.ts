import { NestFactory } from '@nestjs/core';
import { DeliveryAppModule } from './delivery.app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DeliveryAppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'orders_queue',
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
