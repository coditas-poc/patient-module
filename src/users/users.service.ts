import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { Credentials } from '../credentials/credentials.entity';
import { RpcException } from '@nestjs/microservices';
import { CreateAuthUserDto } from './user.dto';
import { Logger } from '@nestjs/common';
import bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class UsersService {
    // create a logger instance
    private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Credentials)
    private loginRepository: Repository<Credentials>,
  ) {}
  async getLoginCredential(email: string): Promise<Credentials> {

    const users = await this.loginRepository.findOne({
      where: { email },
    });
    return users;
  }

  async getUserDetails(res): Promise<any> {
    try {
      const userDetails = await this.usersRepository.findOneOrFail({
        email: res.email,
      });
      return userDetails;
    } catch (e) {
      // console.log('userDetails', e);
    }
  }

  public async verifyAuthUserByEmail(dto) {
    this.logger.log('Fetch login');
    const auth = await this.loginRepository.findOne({ email: dto.email });
    if (!auth) {
      throw new RpcException(
        new UnauthorizedException('User with provided email does not exist'),
      );
    }
    const passHash = await bcrypt.compare(dto.password, auth.password);
    if (passHash) {
      return { email: auth.email};
    } else {
      throw new RpcException(new UnauthorizedException('Password is incorrect'));
    }
  }

  public async createAuthUser(authUser: CreateAuthUserDto): Promise<Users> {
    const salt = bcrypt.genSaltSync(saltRounds);
    const { password, ...rest } = authUser;
    const hashPass = bcrypt.hashSync(password, salt);
    const emailUser = await this.usersRepository.findOne({
      email: authUser.email,
    });
    if (emailUser) {
      throw new RpcException(
        new ConflictException(
          'User with provided email or phone number already exists',
        ),
      );
    }
    const usersData = await this.usersRepository.save(rest);

    if (usersData) {
      const userId = usersData.id;
      const { email } = usersData;
      await this.loginRepository.save({email, password: hashPass, userId});
      return usersData;
    }
  }
}
