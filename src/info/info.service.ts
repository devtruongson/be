import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Info } from 'src/schema/infoSchema/info.schema';
import { createInfo } from './dto/createInfo.dto';

@Injectable()
export class InfoService {
    constructor(@InjectModel(Info.name) private readonly infoModel: Model<Info>) {}

    createInfo(data: createInfo) {
        const dataNew = new this.infoModel({
            ...data,
        });
        return dataNew.save();
    }

    getAllInfo() {
        return this.infoModel.find({}).populate('model');
    }

    getDetailInfo(id: string, is_active: string) {
        return this.infoModel
            .findById(id, {
                is_active: JSON.parse(is_active),
            })
            .populate('model');
    }
}
