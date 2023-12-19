import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Year } from 'src/schema/yearSchema/year.schema';
import { createYearDTO } from './dto/createYear.dto';

@Injectable()
export class YearService {
    constructor(@InjectModel(Year.name) private readonly yearModel: Model<Year>) {}

    async createYear(data: createYearDTO) {
        const checkYearExit = await this.yearModel.findOne({
            code_year: data.code_year,
        });

        if (checkYearExit) {
            throw new BadRequestException('Năm đã có trong hệ thống!');
        }
        const newYear = new this.yearModel({
            ...data,
        });
        return newYear.save();
    }

    getAllYear() {
        return this.yearModel.find();
    }
}
