import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Allergy } from 'src/emergency/entities/allergy.entity';
import { Medication } from 'src/emergency/entities/medication.entity';
import { Contact } from 'src/emergency/entities/contact.entity';
import { Credentials } from 'src/credentials/credentials.entity';

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

  @OneToMany(type => Allergy, allergy => allergy.user, { eager: true})
  allergies: Allergy[];

  @OneToMany(type => Medication, medication => medication.user, { eager: true})
  medications: Medication[];

  @OneToMany(type => Contact, contact => contact.user, { eager: true})
  contacts: Contact[];

  @OneToOne(type => Credentials, credential => credential.user, { eager: true })
  credential: Credentials;
}
