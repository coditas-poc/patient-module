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

@Entity('credentials')
export class Credentials extends BaseEntity {

  @Column('varchar', { length: 500, unique: true })
  email: string;

  @Column('text', { nullable: true })
  password: string;

  @Column('varchar', { length: 500, nullable: true })
  userId: string;
}
