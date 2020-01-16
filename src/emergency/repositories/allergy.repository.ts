import { EntityRepository, Repository } from "typeorm";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { Allergy } from "../entities/allergy.entity";
import { CreateAllergyDto } from "../dto/create-allergy.dto";

@EntityRepository(Allergy)
export class AllergyRepository extends Repository<Allergy> {
    private logger = new Logger('AllergyRepository');

    async addAllergy(createAllergyDto: CreateAllergyDto){
        const allergy = new Allergy();
        const { name, level } = createAllergyDto;
        allergy.name = name;
        allergy.level = level;
        
        try{
            await allergy.save();
        } catch (error) {
            this.logger.error(`Failed to create a allergy. Data ${JSON.stringify(createAllergyDto)}`);
            throw new InternalServerErrorException();
        }

        return allergy;
    }
}