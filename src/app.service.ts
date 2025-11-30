import { Injectable } from '@nestjs/common';

// Application service containing reusable business logic.
// This service is injected into controllers to provide data or execute operations. 
@Injectable()
export class AppService {

  // Returns a simple greeting message (placeholder for future business logic). 
  getHello(): string {
    return 'Hello World!';
  }
}
