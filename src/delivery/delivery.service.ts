import { Injectable, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class DeliveryService {
  private readonly logger = new Logger(DeliveryService.name);

  @MessagePattern('order_created')
  handleOrderCreated(@Payload() data: any) {
    this.logger.log(`New order received for delivery: ${JSON.stringify(data)}`);
    // here you could assign a driver, calculate ETA, etc.
  }

  @MessagePattern('order_status_updated')
  handleOrderStatusUpdated(@Payload() data: any) {
    this.logger.log(`Order status updated: ${JSON.stringify(data)}`);
    // here you could notify customer, update delivery tracking, etc.
  }
}
