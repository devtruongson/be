import { BadRequestException, Injectable } from '@nestjs/common';
import { createPointDTO } from './dto/createPoint.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Point } from 'src/schema/pointSchema/point.schema';
import { Model } from 'mongoose';

@Injectable()
export class PointService {
    constructor(@InjectModel(Point.name) private readonly pointModel: Model<Point> ) {}
    
   async createPoint(
        data: createPointDTO,
        files: {
            image?: Express.Multer.File[];
            file?: Express.Multer.File[];
        },
    ) {
        const checkPointExit =await this.pointModel.findOne({
            year: data.year
        })

        if(checkPointExit) {
            throw  new BadRequestException("Bản ghi đã tồn tại")
        }

        const newPoint = new this.pointModel({
            title: data.title,
            year: data.year,
            file: files['file[]'][0].filename,
            type: files['file[]'][0].originalname.split('.')[files['file[]'][0].originalname.split('.').length - 1],
            image_url: files['image[]'].map((item: Express.Multer.File) => item.filename)
        })
        return newPoint.save()
        
    }
}
