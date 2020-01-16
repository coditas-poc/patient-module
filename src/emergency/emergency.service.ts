import { Injectable } from '@nestjs/common';
import { ContactRepository } from './repositories/contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AllergyRepository } from './repositories/allergy.repository';
import { MedicationRepository } from './repositories/medication.repository';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { CreateAllergyDto } from './dto/create-allergy.dto';

@Injectable()
export class EmergencyService {
    constructor(
        @InjectRepository(ContactRepository)
        private contactRepository: ContactRepository,
        private allergyRepository: AllergyRepository,
        private medicationRepository: MedicationRepository
        ){}

    async addContact(createContactDto: CreateContactDto){
        return await this.contactRepository.addContact(createContactDto);
    }

    async getContacts(){
        const contacts = await this.contactRepository.find();
        return contacts;
    }
    
    async addMedicalDetails(data){
        let allergies = [];
        let medicines = [];
        
        await Promise.all(data.allergies.map(async (allergy: CreateAllergyDto): Promise<any> => {
             allergies.push(await this.allergyRepository.addAllergy(allergy));
        }))
        
        await Promise.all(data.medicines.map(async (medicine: CreateMedicationDto): Promise<any> =>{
            medicines.push(await this.medicationRepository.addMedication(medicine));
        }))

        return {
            allergies,medicines
        }
    }

    async getMedicalDetails(){
        const allergies = await this.allergyRepository.find();
        const medications = await this.medicationRepository.find();
        return {
            allergies,
            medications
        }
    }

    
}
