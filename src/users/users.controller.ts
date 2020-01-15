import { Controller, Logger, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateAuthUserDto } from '../auth/auth.dto';

@Controller()
export class UsersController {
  // create a logger instance
  private logger = new Logger('AppController');

  // inject the patient service
  constructor(private usersService: UsersService) {}

  @MessagePattern('getUserDetails')
  async getUserDetails(@Body() req): Promise<any> {
      const user = await this.usersService.getUserDetails(req);
      return user;
  }

  @MessagePattern({ cmd: 'signup' })
  public async createAuthUser(createAuthUserDto: CreateAuthUserDto): Promise<any> {
    return this.usersService.createAuthUser(createAuthUserDto);
  }
}
