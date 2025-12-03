import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'Online Food Ordering API',
      status: 'running',
      version: '1.0.0',
      endpoints: [
        '/orders',
        '/orders/:id',
        '/orders/:id/status'
      ],
      message: 'Welcome! The backend is deployed successfully 🚀'
    };
  }
}
