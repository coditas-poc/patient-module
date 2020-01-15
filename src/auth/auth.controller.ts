import {
  Controller,
  Post,
  UseGuards,
  Body,
  Req,
  Res,
  Logger,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseBody } from 'utils/responseBody';
import { Constants } from 'utils/constants';
import { AuthGuard } from '@nestjs/passport';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ExceptionFilter } from 'src/filters/rpc-exception.filter';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  // create a logger instance
  private logger = new Logger('AuthController');
  constructor(private readonly authService: AuthService) {}

  // @UseFilters(new ExceptionFilter())
  @MessagePattern('login')
  async login(@Body() request, @Res() res: Response): Promise<any> {
      const user = await this.authService.login(request);
      if (user.statusCode === '200') {
          return user;
      } else {
          return user.message;
      }
  }
}
