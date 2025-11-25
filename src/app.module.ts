import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // 👉 your DB username
      password: 'password', // 👉 your DB password
      database: 'food_ordering',
      autoLoadEntities: true,
      synchronize: true,
    }),
    OrdersModule,
    DeliveryModule,
  ],
})
export class AppModule {}
