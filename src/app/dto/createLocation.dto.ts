import { IsNotEmpty } from 'class-validator';

export class createLocation {
    name: string;
    @IsNotEmpty()
    location: string;
    @IsNotEmpty()
    province: string;
    iframe_url: string;
    is_active: boolean;
    phone_number: string[];
}
