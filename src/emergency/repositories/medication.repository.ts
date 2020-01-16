import { EntityRepository, Repository } from "typeorm";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { Medication } from "../entities/medication.entity";
import { CreateMedicationDto } from "../dto/create-medication.dto";

@EntityRepository(Medication)
export class MedicationRepository extends Repository<Medication> {
    private logger = new Logger('MedicationRepository');

    async addMedication(createMedicationDto: CreateMedicationDto){
        const medication = new Medication();
        const { name, level,time } = createMedicationDto;
        medication.name = name;
        medication.level = level;
        medication.time = time;
        
        try{
            await medication.save();
        } catch (error) {
            this.logger.error(`Failed to create a medication. Data ${JSON.stringify(createMedicationDto)}`);
            throw new InternalServerErrorException();
        }

        return medication;
    }
}