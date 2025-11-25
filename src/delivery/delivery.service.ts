import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller() // 👈 Add this decorator
export class DeliveryService {
  private readonly logger = new Logger(DeliveryService.name);

  constructor() {
    this.logger.log('🚀 DeliveryService initialized');
  }

  @EventPattern('order_created')
  handleOrderCreated(@Payload() data: any) {
    this.logger.log(
      `📦 New order received for delivery: ${JSON.stringify(data)}`,
    );
  }

  @EventPattern('order_status_updated')
  handleOrderStatusUpdated(@Payload() data: any) {
    this.logger.log(`🚚 Order status updated: ${JSON.stringify(data)}`);
  }
}
