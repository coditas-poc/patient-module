import { IsNotEmpty } from 'class-validator';

export class CreateAllergyDto {
    @IsNotEmpty()
    item: string;

    @IsNotEmpty()
    severity: string;

}

