import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ContactRepository } from './repositories/contact.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AllergyRepository } from './repositories/allergy.repository';
import { MedicationRepository } from './repositories/medication.repository';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class EmergencyService {
    private logger = new Logger('EmergencyService');
    constructor(
        @InjectRepository(ContactRepository)
        private contactRepository: ContactRepository,
        private allergyRepository: AllergyRepository,
        private medicationRepository: MedicationRepository,
        private userRepository: UserRepository
        ){}

    async addContact(contactDetails){
        const user = await this.userRepository.findOne(contactDetails.id);
        if(!user){
            throw new UnauthorizedException();
        }

        return await this.contactRepository.addContact(contactDetails.contact,user);
    }

    async getContacts(id){
        const user = await this.userRepository.findOne(id); 
        if(!user){
            throw new UnauthorizedException();
        }
        const contacts = await this.contactRepository.getContacts(user);
        return contacts;
    }
    
    async addMedicalDetails(medicalDetails){
        let allergies = [];
        let medicines = [];

        const user = await this.userRepository.findOne(medicalDetails.id);
        if(!user){
            throw new UnauthorizedException();
        }
        
        await Promise.all(medicalDetails.emergency.allergies.map(async (allergy: CreateAllergyDto): Promise<any> => {
             allergies.push(await this.allergyRepository.addAllergy(allergy,user));
        }))
        
        await Promise.all(medicalDetails.emergency.medicines.map(async (medicine: CreateMedicationDto): Promise<any> =>{
            medicines.push(await this.medicationRepository.addMedication(medicine,user));
        }))

        return {
            allergies,medicines
        }
    }

    async getMedicalDetails(id){
        const user = await this.userRepository.findOne(id);
        if(!user){
            throw new UnauthorizedException();
        }

        const allergies = await this.allergyRepository.getAllergies(user);
        const medicines = await this.medicationRepository.getMedications(user);

        return {
            allergies,
            medicines
        }
    }
    
}
