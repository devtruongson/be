import { IsNotEmpty } from 'class-validator';

export class createPointDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    year: string;

    @IsNotEmpty()
    file: File;
}
