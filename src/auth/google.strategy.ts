import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService, Provider } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID:
        '403562974181-59i367cbf9njrt2c9q8t1d1tj2s0sf7r.apps.googleusercontent.com', // <- Replace this with your client id
      clientSecret: 'sceWVSAWYK8w-t2LenCRX7W_', // <- Replace this with your client secret
      callbackURL: 'http://localhost:8000/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile'],
    });
  }
  async validate( request: any, accessToken: string, refreshToken: string, profile, done: any) {
    try {
      const jwt: string = await this.authService.validateOAuthLogin(
        profile.id,
        Provider.GOOGLE,
      );
      const user = { jwt };
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
