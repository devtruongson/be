import { BadRequestException, Injectable } from '@nestjs/common';
import { createModelDTO } from './dto/createModel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ModelWit } from 'src/schema/modelSchema/model.schema';
import { Model } from 'mongoose';

@Injectable()
export class ModelWitService {
    constructor(@InjectModel(ModelWit.name) private readonly witModel: Model<ModelWit>) {}

    async createModel(data: createModelDTO) {
        const checkModelExit = await this.witModel.findOne({
            code_model: data.code_model,
        });
        if (checkModelExit) {
            throw new BadRequestException('Model Wit đã tồn tại!');
        }
        const newModel = new this.witModel({
            ...data,
        });
        return newModel.save();
    }

    getAllModelWit() {
        return this.witModel.find();
    }

    async getDetailModelWit(code_model: string) {
        const modelWit = await this.witModel.findOne({
            code_model: code_model,
        });
        if (!modelWit) {
            throw new BadRequestException('Model Not Found');
        }
        return modelWit;
    }
}
