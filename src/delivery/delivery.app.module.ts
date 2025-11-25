import { Module } from '@nestjs/common';
import { DeliveryModule } from './delivery.module';

@Module({
  imports: [DeliveryModule], // ONLY delivery logic
})
export class DeliveryAppModule {}
