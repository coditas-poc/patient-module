import { EntityRepository, Repository } from "typeorm";
import { CreateContactDto } from "../dto/create-contact.dto";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { Users } from "src/users/users.entity";
import { EmergencyContact } from "../entities/emergencycontact.entity";

@EntityRepository(EmergencyContact)
export class EmergencyContactRepository extends Repository<EmergencyContact> {
    private logger = new Logger('EmergencyContactRepository');

    async addContact(
        createContactDto: CreateContactDto,
        user: Users
        ){
        const contact = new EmergencyContact();
        const { name, relation, phone } = createContactDto;
        contact.name = name;
        contact.relation = relation;
        contact.phone = phone;
        contact.user = user;
        
        try{
            await contact.save();
        } catch (error) {
            this.logger.error(`Failed to create a contact for user ${user.email}. Data ${JSON.stringify(createContactDto)}`);
            throw new InternalServerErrorException();
        }

        delete contact.user;
        return contact;
    }

    async getContacts(user: Users): Promise<EmergencyContact[]>{
        const query = this.createQueryBuilder('contact');
        query.where('"contact"."userId" = :userId', { userId : user.id});

        try {
            const contacts = await query.getMany();
            return contacts;
        } catch(error) {
            this.logger.verbose(`Failed to get contacts for user ${user.email}`);
            throw new InternalServerErrorException();
        }
    }

}