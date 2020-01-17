import { Injectable, Logger, UnauthorizedException, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from 'src/users/users.entity';
import bcrypt = require('bcrypt');
import { InjectRepository } from '@nestjs/typeorm';
import { Credentials } from '../credentials/credentials.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  // create a logger instance

}
