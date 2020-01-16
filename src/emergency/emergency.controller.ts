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
    async getContacts(){
        return await this.emergencyServices.getContacts();
    }

    @MessagePattern('getMedicalDetails')
    async getMedicalDetails(){
        return await this.emergencyServices.getMedicalDetails();
    }

    @MessagePattern('addMedicalDetails')
    async addMedicalDetails(data){
        return await this.emergencyServices.addMedicalDetails(data);
    }
    

}
