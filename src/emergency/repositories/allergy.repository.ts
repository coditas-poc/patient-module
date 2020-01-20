import { EntityRepository, Repository } from "typeorm";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { Allergy } from "../entities/allergy.entity";
import { CreateAllergyDto } from "../dto/create-allergy.dto";
import { Users } from "src/users/users.entity";

@EntityRepository(Allergy)
export class AllergyRepository extends Repository<Allergy> {
    private logger = new Logger('AllergyRepository');

    async addAllergy(
        createAllergyDto: CreateAllergyDto,
        user: Users
        ){
        const allergy = new Allergy();
        const { item, severity } = createAllergyDto;
        allergy.item = item;
        allergy.severity = severity;
        allergy.user = user;

        try{
            await allergy.save();
        } catch (error) {
            this.logger.error(`Failed to create a allergy for user ${user.email}. Data ${JSON.stringify(createAllergyDto)}`);
            throw new InternalServerErrorException();
        }

        delete allergy.user;
        return allergy;
    }

    async getAllergies(user: Users): Promise<Allergy[]>{
        const query = this.createQueryBuilder('allergy');
        query.where('"allergy"."userId" = :userId',{ userId : user.id });
        
        try {
            const allergies = await query.getMany();
            return allergies;
        } catch(error) {
            this.logger.error(`Failed to get allergies for user ${user.email}.}`);
            throw new InternalServerErrorException();
        }
    }
}