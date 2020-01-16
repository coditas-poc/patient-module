import { Controller, Logger, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateAuthUserDto } from './user.dto';

@Controller()
export class UsersController {
  // create a logger instance
  private logger = new Logger('AppController');

  // inject the patient service
  constructor(private usersService: UsersService) {}

  @MessagePattern('getUserDetails')
  async getUserDetails(dto): Promise<any> {
      const user = await this.usersService.getUserDetails(dto);
      return user;
  }
  @MessagePattern('login')
  async login(dto): Promise<any> {
      return await this.usersService.verifyAuthUserByEmail(dto);
  }
  @MessagePattern('signup')
  public async createAuthUser(createAuthUserDto: CreateAuthUserDto): Promise<any> {
    return this.usersService.createAuthUser(createAuthUserDto);
  }
}
