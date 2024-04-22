import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PointService } from './point.service';
import { createPointDTO } from './dto/createPoint.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('point')
export class PointController {
    constructor(private readonly pointService: PointService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image[]' }, { name: 'file[]', maxCount: 1 }]))
    createPoint(
        @Body() data: createPointDTO,
        @UploadedFiles() files: { image?: Express.Multer.File[]; file?: Express.Multer.File[] },
    ) {
        return this.pointService.createPoint(data, files);
    }
}
