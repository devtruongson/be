import { BadRequestException, Controller, Get, Param, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Get('/folder/app/:imgpath')
    seeUploadedImage(@Param('imgpath') image: string, @Res() res: Response) {
        if (!image) {
            throw new BadRequestException();
        }
        return res.sendFile(image, { root: `./upload` });
    }
}
