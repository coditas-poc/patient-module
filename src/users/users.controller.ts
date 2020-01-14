import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // create a logger instance
  private logger = new Logger('AppController');

  // inject the patient service
  constructor(private usersService: UsersService) {}

  // define message pattern for get all patients method
  // @MessagePattern('getPatients')
  // getPatients() {
  //   this.logger.log('Fetching patients');
  //   return this.usersService.getPatients();
  // }
}
