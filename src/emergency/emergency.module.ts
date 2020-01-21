import { Module } from '@nestjs/common';
import { EmergencyController } from './emergency.controller';
import { EmergencyService } from './emergency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationRepository } from './repositories/medication.repository';
import { AllergyRepository } from './repositories/allergy.repository';
import { UserRepository } from 'src/users/user.repository';
import { EmergencyContactRepository } from './repositories/emergencycontact.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmergencyContactRepository,MedicationRepository,AllergyRepository,UserRepository])
  ],
  controllers: [EmergencyController],
  providers: [EmergencyService]
})
export class EmergencyModule {}
