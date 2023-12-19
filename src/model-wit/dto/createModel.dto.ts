import { IsNotEmpty, IsNumber } from 'class-validator';

export class createModelDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    code_model: number;

    @IsNotEmpty()
    name_unix_model: string;
}
