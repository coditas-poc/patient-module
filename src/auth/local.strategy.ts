import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('-------> userstartery', username);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
        throw new RpcException(
        new UnauthorizedException('User with provided email does not exist'),
      );
    }
    return user;
  }
}
