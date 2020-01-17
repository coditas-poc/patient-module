import { Controller, Logger } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { EmergencyService } from './emergency.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class EmergencyController {

    constructor(private emergencyServices: EmergencyService){}

    @MessagePattern('addContactDetails')
    addContact(contactDetails){
        return this.emergencyServices.addContact(contactDetails);
    }

    @MessagePattern('getContactDetails')
    async getContacts(id){
        return await this.emergencyServices.getContacts(id);
    }

    @MessagePattern('getMedicalDetails')
    async getMedicalDetails(id){
        return await this.emergencyServices.getMedicalDetails(id);
    }

    @MessagePattern('addMedicalDetails')
    async addMedicalDetails(medicalDetails){
        return await this.emergencyServices.addMedicalDetails(medicalDetails);
    }
    

}
