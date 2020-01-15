import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
// import { Credentials } from 'src/credentials/credentials.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/users.entity';
import bcrypt = require('bcrypt');
import { sign } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Credentials } from '../credentials/credentials.entity';
import { Constants } from 'utils/constants';
import { json } from 'express';
import { RpcException } from '@nestjs/microservices';

export enum Provider {
  GOOGLE = 'google',
}

const saltRounds = 10;
@Injectable()
export class AuthService {
    // create a logger instance
    private logger = new Logger('AuthService');
  private readonly JWT_SECRET_KEY = process.env.JWT_SECRETE_TOKEN;
  constructor(
    public readonly usersService: UsersService,
    public readonly jwtService: JwtService,
    @InjectRepository(Credentials)
    public readonly loginRepository: Repository<Credentials>,
    @InjectRepository(Users) public readonly usersRepository: Repository<Users>,
  ) {}

  async validateUser(payload): Promise<any> {
    this.logger.log('validate user');
    const user = await this.usersService.getLoginCredential(payload.email);
    if (user) {
        const hash = await bcrypt.compare(payload.password, user.password);
        if (hash) {
            return {
                statusCode: Constants.STATUSCODE.SUCCESS,
                status: Constants.STATUS.SUCCESS,
                access_token: this.jwtService.sign(payload),
              };
        }
    } else {
        return 'No user found';
    }

    return null;
  }

  async login(payload) {
    this.logger.log('login check');
    const user = await this.usersService.getLoginCredential(payload.email);
    if (user) {
        const hashPass = await bcrypt.compare(payload.password, user.password);
        console.log('>> hash', hashPass);
        if (hashPass) {
            return {
                email: user.email,
              };
        } else {
            return {message: 'Invalid Email-id or password'};
        }
    } else {
        return {message: 'Email id not registered'};
    }
  }

  async signup(payload): Promise<any> {
    try {
      const salt = bcrypt.genSaltSync(saltRounds);
      const { password } = payload;
      const hashPass = bcrypt.hashSync(password, salt);
      const userData = await this.usersRepository.save(payload);
      if (userData) {
        const userId = userData.id;
        const { email } = userData;
        await this.loginRepository.save({ email, password: hashPass, userId });
        return { access_token: this.jwtService.sign({ username: email }) };
      }
    } catch (e) {
      const message = e.detail;
      return { message };
    }
  }

  async validateOAuthLogin(
    thirdPartyId: string,
    provider: Provider,
  ): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

      const payload = { thirdPartyId, provider };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, {
        expiresIn: 3600,
      });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
