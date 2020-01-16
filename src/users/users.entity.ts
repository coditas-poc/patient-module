import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('users')
export class Users extends BaseEntity {

  @Column('varchar', { length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 10 })
  gender: string;
    // changed mobile no to common entity
  @Column({ type: 'varchar', length: 12})
  mobileNumber: number;

  @Column({ type: 'varchar', length: 500 })
  insuranceFront: string;

  @Column({ type: 'varchar', length: 500 })
  insuranceBack: string;

  @Column({ type: 'varchar', length: 100 })
  dob: string;

  @Column({ type: 'varchar', length: 200 })
  provider: string;

  @Column({ type: 'varchar', length: 200 })
  drivingLicenseFront: string;

  @Column({ type: 'varchar', length: 200 })
  drivingLicenseBack: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  memberId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  OTP: string;

  @Column('boolean', { default: false })
  numberVerfied: boolean;

  @Column('boolean', { default: false })
  emailVerfied: boolean;

}
