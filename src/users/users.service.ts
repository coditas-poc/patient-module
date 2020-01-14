import { Injectable } from '@nestjs/common';
import { PATIENTS } from '../mocks/patients.mock';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { Credentials } from '../credentials/credentials.entity';

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
}
