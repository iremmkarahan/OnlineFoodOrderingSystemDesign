import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//Test suit for AppController - verifies controller behavior and returned responses.
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    //Creates a testing module that includes AppController and its dependent AppService
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    //Retrieves an istance of AppController from the coplied testing module.
    appController = app.get<AppController>(AppController);
  });

  //Test group for the "root" endpoint behavior.
  describe('root', () => {
    //Verifies that the controller returns the expected static string response.
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
