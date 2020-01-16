import { IsNotEmpty } from 'class-validator';

export class CreateMedicationDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    level: string;

    @IsNotEmpty()
    time: string;
}

