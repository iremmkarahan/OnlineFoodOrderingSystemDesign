import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Creates a NestJS application instance using the root AppModule.
  const app = await NestFactory.create(AppModule);

  // Determines the port number dynamically (e.g., for production environments), falling back to 3000 if PORT is not set.
  const port = process.env.PORT || 3000;

  // Starts the REST API server and begins listening for incoming HTTP requests.
  await app.listen(port);

  console.log(`🚀 REST API running on port ${port}`);
}

// Initializes the application bootstrap process.
bootstrap();
