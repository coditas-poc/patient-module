import { EntityRepository, Repository } from "typeorm";
import { Contact } from "../entities/contact.entity";
import { CreateContactDto } from "../dto/create-contact.dto";
import { InternalServerErrorException, Logger } from "@nestjs/common";

@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact> {
    private logger = new Logger('ContactRepository');

    async addContact(createContactDto: CreateContactDto){
        const contact = new Contact();
        const { name, relation, phone } = createContactDto;
        contact.name = name;
        contact.relation = relation;
        contact.phone = phone;
        
        try{
            await contact.save();
        } catch (error) {
            this.logger.error(`Failed to create a contact. Data ${JSON.stringify(createContactDto)}`);
            throw new InternalServerErrorException();
        }

        return contact;
    }
}