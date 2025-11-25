import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Module({
  controllers: [DeliveryService],
})
export class DeliveryModule {}
