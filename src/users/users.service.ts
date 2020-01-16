import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PATIENTS } from '../mocks/patients.mock';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { Credentials } from '../credentials/credentials.entity';
import { RpcException } from '@nestjs/microservices';
import { CreateAuthUserDto } from 'src/auth/auth.dto';

@Injectable()
export class UsersService {
  // patients = PATIENTS;

  // getPatients(): Promise<any> {
  //     return new Promise(resolve => {
  //         resolve(this.patients);
  //     });
  // }

  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Credentials)
    private loginRepository: Repository<Credentials>,
  ) {}
  async userLogin(): Promise<Users[]> {
    const userDetails = await this.usersRepository.find();
    return userDetails;
  }
  async userSignUp(users: Users): Promise<Users> {
    const { email } = users;
    const usersData = await this.usersRepository.save(users);
    const saveLoginData = await this.loginRepository.save({ email });
    return { ...usersData, ...saveLoginData };
  }
  async getLoginCredential(email: string): Promise<Credentials> {
    const users = await this.loginRepository.findOne({
      where: { email },
    });
    return users;
  }
  async getUserDetails(id): Promise<any> {
    try {
      const userDetails = await this.usersRepository.findOne(id);
      // .catch(() => {
      //   throw new RpcException(
      //     new NotFoundException('User with provided id does not exist'),
      //   );
      // });
      console.log('userDetails', userDetails);
      return userDetails;
    } catch (e) {
      console.log('userDetails', e);
    }
  }

  public async createAuthUser(authUser: CreateAuthUserDto): Promise<Users> {
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
    const usersData = await this.usersRepository.save(authUser);
    const saveLoginData = await this.loginRepository.save({
      email: authUser.email,
    });
    if (usersData && saveLoginData) {
      return usersData;
    }
  }
}
