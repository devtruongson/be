import { Injectable } from '@nestjs/common';
import { createPointDTO } from './dto/createPoint.dto';

@Injectable()
export class PointService {
    createPoint(
        data: createPointDTO,
        files: {
            image?: Express.Multer.File[];
            file?: Express.Multer.File[];
        },
    ) {
        console.log();
    }
}
