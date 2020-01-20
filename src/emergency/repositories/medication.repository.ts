import { EntityRepository, Repository } from "typeorm";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { Medication } from "../entities/medication.entity";
import { CreateMedicationDto } from "../dto/create-medication.dto";
import { Users } from "src/users/users.entity";

@EntityRepository(Medication)
export class MedicationRepository extends Repository<Medication> {
    private logger = new Logger('MedicationRepository');

    async addMedication(
        createMedicationDto: CreateMedicationDto,
        user: Users
        ){
        const medication = new Medication();
        const { name, dosage,time } = createMedicationDto;
        medication.name = name;
        medication.dosage = dosage;
        medication.time = time;
        medication.user = user;
        
        try{
            await medication.save();
        } catch (error) {
            this.logger.error(`Failed to create a medication for user ${user.email}. Data ${JSON.stringify(createMedicationDto)}`);
            throw new InternalServerErrorException();
        }

        delete medication.user;
        return medication;
    }

    async getMedications(user: Users): Promise<Medication[]> {
        const query = this.createQueryBuilder('medication');
        query.where('"medication"."userId" = :userId', { userId: user.id});

        try {
            const medications = await query.getMany();
            return medications;
        } catch(error) {
            this.logger.error(`Failed to get medications for user ${user.email}.}`);
            throw new InternalServerErrorException();
        }
    }

}