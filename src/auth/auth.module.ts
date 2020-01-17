import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { Credentials } from 'src/credentials/credentials.entity';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { CredentialsModule } from 'src/credentials/credentials.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Credentials]),
    UsersModule,
    CredentialsModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
