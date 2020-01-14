import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Credentials } from './credentials.entity';

@Injectable()
export class CredentialsService {
    constructor(
        @InjectRepository(Credentials) private userRepository: Repository<Credentials>,
    ) {}
}
