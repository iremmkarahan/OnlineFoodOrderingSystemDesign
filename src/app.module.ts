import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';

// Root application module responsible for configuring global modules and dependencies.
@Module({
  imports: [
    // Database configuration for PostgreSQL using TypeORM.
    TypeOrmModule.forRoot({
      type: 'postgres',              // Specifies the database driver
      host: 'localhost',             // Database server host 
      port: 5432,                    // Default PostgreSQL port
      username: 'postgres',          // DB user for authentication
      password: 'password',          // DB password
      database: 'food_ordering',     // Name of the application database
      autoLoadEntities: true,        // Automatically loads entities without manual imports
      synchronize: true,             // Syncs entity schemas with the database 
    }),
    
    //Imports OrdersModule, enabling order-related features in the application.
    OrdersModule,
  ],
})
export class AppModule {}
