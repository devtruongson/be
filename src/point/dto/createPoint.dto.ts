import { IsNotEmpty } from 'class-validator';

export class createPointDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    year: string;

    @IsNotEmpty()
    content_mark_down: string;

    @IsNotEmpty()
    content_html: string;

}
