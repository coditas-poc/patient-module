import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CredentialsService } from 'src/credentials/credentials.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { Credentials } from 'src/credentials/credentials.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { Repository } from 'typeorm';
// import { Doctors } from 'src/doctors/doctors.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Credentials]),
    PassportModule.register({ defaultStrategy: 'bearer' }),
    UsersModule,
    CredentialsModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600000s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    // JwtService,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
