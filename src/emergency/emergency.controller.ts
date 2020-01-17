import { Controller, Logger } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { EmergencyService } from './emergency.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class EmergencyController {

    constructor(private emergencyServices: EmergencyService){}

    @MessagePattern('addContactDetails')
    addContact(createContactDto: CreateContactDto){
        return this.emergencyServices.addContact(createContactDto);
    }

    @MessagePattern('getContactDetails')
    async getContacts(patient){
        return await this.emergencyServices.getContacts(patient);
    }

    @MessagePattern('getMedicalDetails')
    async getMedicalDetails(patient){
        return await this.emergencyServices.getMedicalDetails(patient);
    }

    @MessagePattern('addMedicalDetails')
    async addMedicalDetails(data){
        return await this.emergencyServices.addMedicalDetails(data);
    }
    

}
