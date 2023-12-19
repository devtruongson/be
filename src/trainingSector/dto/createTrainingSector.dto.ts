import { IsNotEmpty } from 'class-validator';

export class createTrainingSector {
    @IsNotEmpty()
    name: string;
    master: number;
    university: number;
    college: number;
    is_active: boolean;
    iframe_url: string;
}
