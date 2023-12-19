import { IsNotEmpty } from 'class-validator';

export class createYearDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    code_year: string;
}
