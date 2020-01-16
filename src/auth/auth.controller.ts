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
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {

}
