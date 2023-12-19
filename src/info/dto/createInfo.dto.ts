import { IsBoolean, IsNotEmpty } from 'class-validator';

export class createInfo {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content_mark_down: string;

    @IsNotEmpty()
    content_html: string;

    @IsNotEmpty()
    @IsBoolean()
    is_active: boolean;

    @IsNotEmpty()
    model: string;
}
