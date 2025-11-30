import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//Manin application controller responsible for handling incoming HTTP requests.
@Controller()
export class AppController {
  //Injects AppService to access business logic and response methods.
  constructor(private readonly appService: AppService) {}

  //Handle HTTP GET requests to the root route ('/')
  @Get()
  getHello(): string {
    //Delegates the response generation to AppService and returns the result.
    return this.appService.getHello();
  }
}
