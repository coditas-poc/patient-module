import { Module } from '@nestjs/common';
import { EmergencyController } from './emergency.controller';
import { EmergencyService } from './emergency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactRepository } from './repositories/contact.repository';
import { MedicationRepository } from './repositories/medication.repository';
import { AllergyRepository } from './repositories/allergy.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactRepository,MedicationRepository,AllergyRepository])
  ],
  controllers: [EmergencyController],
  providers: [EmergencyService]
})
export class EmergencyModule {}
