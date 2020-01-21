import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Users } from 'src/users/users.entity';

@Entity('credentials')
export class Credentials extends BaseEntity {

  @Column('varchar', { length: 500, unique: true })
  email: string;

  @Column('text', { nullable: true })
  password: string;

  @OneToOne(type => Users, user => user.credential, { eager: false})
  @JoinColumn()
  user: Users;

}
