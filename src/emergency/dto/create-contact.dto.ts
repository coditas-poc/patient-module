import { IsNotEmpty } from 'class-validator';

export class CreateContactDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    relation: string;

    @IsNotEmpty()
    phone: string;
}

