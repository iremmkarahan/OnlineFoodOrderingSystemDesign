import { Injectable } from '@nestjs/common';

// The AppService contains general-purpose logic shared across the application.
// In this case, it provides a simple status/info response for the root ("/") route.
@Injectable()
export class AppService {
  
  // Returns a JSON object describing the status and available endpoints of the API.
  // This is displayed when someone visits the root URL of the backend.
  getHello() {
    return {
      // Name of the backend service
      name: 'Online Food Ordering API',

      // Indicates that the service is healthy and responding
      status: 'running',

      // Version of the API for reference (useful in presentations and debugging)
      version: '1.0.0',

      // List of primary API endpoints the backend exposes
      endpoints: [
        '/orders',
        '/orders/:id',
        '/orders/:id/status'
      ],

      // A friendly welcome message confirming successful deployment
      message: 'Welcome! The backend is deployed successfully 🚀'
    };
  }
}
