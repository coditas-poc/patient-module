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

@Controller('auth')
export class AuthController {
  // create a logger instance
  private logger = new Logger('AuthController');
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  // @UseFilters(new ExceptionFilter())
  @MessagePattern('login')
  async login(@Body() request): Promise<any> {
    return await this.authService.login(request);
  }
}
