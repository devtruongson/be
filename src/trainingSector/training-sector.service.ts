import { Injectable } from '@nestjs/common';
import { createTrainingSector } from './dto/createTrainingSector.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TrainingSector } from 'src/schema/TrainingSectorSchema/TrainingSectors.schema';
import { Model } from 'mongoose';
import { Wit, log } from 'node-wit';
import { IModelWitAI } from 'src/utils/model/model_training';
import { createLocation } from './dto/createLocation.dto';
import { Contact } from 'src/schema/contactSchema/contact.schema';

@Injectable()
export class TrainingSectorService {
    constructor(
        @InjectModel(TrainingSector.name) private readonly trainingSectorModel: Model<TrainingSector>,
        @InjectModel(Contact.name) private readonly contactModel: Model<Contact>,
    ) {}
    private readonly witClient = new Wit({
        accessToken: 'GXEPMTRHFYLUSOD6WIJOPS22URE3P7B6',
        logger: new log.Logger(log.DEBUG),
    });

    createTrainingSector(data: createTrainingSector) {
        const dataNew = new this.trainingSectorModel({
            ...data,
        });
        return dataNew.save();
    }

    createLocation(data: createLocation) {
        const dataNew = new this.contactModel({
            title: data.name,
            is_active: data.is_active,
            iframe_url: data.iframe_url,
            location: data.location,
            province: data.province,
        });
        return dataNew.save();
    }

    async getAllTrainingSections() {
        return this.trainingSectorModel.find({
            is_active: true,
        });
    }

    async getProcessingSections(q: string) {
        const witResponse = await this.witClient.message(q, {});

        if (!witResponse['intents'].length) {
            return {
                data: 'Rất xin lỗi chúng tôi hiện chưa thể hiểu bạn đang nói gì?',
                code: 400,
            };
        }

        if (witResponse['intents'][0].name === IModelWitAI.daoTao) {
            const trainingSector = await this.trainingSectorModel.find({
                is_active: true,
            });

            if (witResponse['entities']['e_nghanh_dao_tao:e_nghanh_dao_tao']) {
                const exactSector = await this.trainingSectorModel
                    .find(
                        {
                            $text: {
                                $search: q,
                            },
                        },
                        {
                            score: { $meta: 'textScore' }, // Lấy điểm tương đồng
                        },
                    )
                    .sort({ score: { $meta: 'textScore' } }); // Sắp xếp theo điểm tương đồng từ cao đến thấp

                if (exactSector.length) {
                    const [result, ...related] = exactSector;

                    return {
                        data: result,
                        related,
                        is_voice: true,
                        is_table: false,
                    };
                }
            }

            return {
                total_count_training_sector: trainingSector.length,
                data: trainingSector,
                is_voice: false,
                is_table: true,
            };
        }
    }
}
