import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
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

export enum Provider {
  GOOGLE = 'google',
}
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

  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.log('emial');
    const user = await this.usersService.getLoginCredential(email);
    const hash = await bcrypt.compare(pass, user.password);

    if (user && hash) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username };
    return {
      statusCode: Constants.STATUSCODE.SUCCESS,
      status: Constants.STATUS.SUCCESS,
      access_token: this.jwtService.sign(payload),
    };
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
