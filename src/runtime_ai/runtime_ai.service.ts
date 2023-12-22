import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Info } from 'src/schema/infoSchema/info.schema';
import { MessageResponse, Wit, log } from 'node-wit';
import { ModelWit } from 'src/schema/modelSchema/model.schema';
import sendResponse from 'src/helpers/sendResponse';
import { ModelWitService } from 'src/model-wit/model-wit.service';
import * as natural from 'natural';
import { TrainingSector } from 'src/schema/TrainingSectorSchema/TrainingSectors.schema';
import { Point } from 'src/schema/pointSchema/point.schema';
import { yearData } from 'src/utils/year/year';

@Injectable()
export class RuntimeAiService {
    constructor(
        @InjectModel(Info.name) private readonly infoModel: Model<Info>,
        @InjectModel(ModelWit.name) private readonly witModel: Model<ModelWit>,
        @InjectModel(Point.name) private readonly pointModel: Model<Point>,
        @InjectModel(TrainingSector.name) private readonly trainingSectorModel: Model<TrainingSector>,
        private readonly witService: ModelWitService,
    ) {}
    private readonly witClient = new Wit({
        accessToken: '63NXBABXQ6HOOG7TTT75NRGYTTPJMHNI',
        logger: new log.Logger(log.DEBUG),
    });

    async runtimeAI(q: string) {
        try {
            const witAI = await this.getModelWitAI(q);

            switch (witAI.intents.length) {
                case 0:
                    return this.handleIntentsNotLength(witAI);
                case 1:
                    return this.handleIntents(witAI, q);
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra vui lòng thử lại sau!');
        }
    }

    async getModelWitAI(q: string): Promise<MessageResponse> {
        const witResponse = await this.witClient.message(q, {
            entities: [
                {
                    values: [
                        {
                            value: q,
                        },
                    ],
                },
            ],
        });

        return witResponse;
    }

    handleIntentsNotLength(wit: MessageResponse) {
        const entitie = this.getObjectWithMaxConfidence(wit.entities);
        console.log(entitie);
        let trait = '';
        for (const key in wit.traits) {
            if (wit.traits[key]) {
                wit.traits[key].map((item: any) => {
                    trait += item.value;
                });
            }
        }
        return sendResponse({
            code: HttpStatus.OK,
            msg: 'ok',
            data: trait,
            match_ai: 0,
            match_query: 0,
        });
    }

    async handleIntents(wit: MessageResponse, q: string) {
        const modelWit = await this.witService.getDetailModelWit(wit.intents[0].id);
        switch (wit.intents[0].id) {
            case '661966659448580': {
                const dataHandle = await this.handleModelAndEntitie(wit.entities, modelWit, q);
                const data = await this.infoModel.findOne({
                    model: dataHandle.model?.code_model || modelWit.code_model,
                });
                return sendResponse({
                    match_ai: wit.intents[0].confidence,
                    match_query: dataHandle.percent_match,
                    is_mark_down: true,
                    code: HttpStatus.OK,
                    data,
                });
            }
            case '377654348051944': {
                const dataHandle = await this.handleModelAndEntitie(wit.entities, modelWit, q);
                const data = await this.infoModel.findOne({
                    model: dataHandle.model?.code_model || modelWit.code_model,
                });
                return sendResponse({
                    match_ai: wit.intents[0].confidence,
                    match_query: dataHandle.percent_match,
                    code: HttpStatus.OK,
                    is_mark_down: true,
                    data,
                });
            }

            case '1034863804387853': {
                const dataHandle = await this.handleModelAndEntitie(wit.entities, modelWit, q);
                const data = await this.infoModel.findOne({
                    model: dataHandle.model?.code_model || modelWit.code_model,
                });
                return sendResponse({
                    match_ai: wit.intents[0].confidence,
                    match_query: dataHandle.percent_match,
                    is_mark_down: true,
                    code: HttpStatus.OK,
                    data,
                });
            }

            case '1042106483707534': {
                const dataHandle = await this.handleModelAndEntitie(wit.entities, modelWit, q);
                const trainingSector = await this.trainingSectorModel.find({
                    is_active: true,
                });
                return sendResponse({
                    match_ai: wit.intents[0].confidence,
                    match_query: dataHandle.percent_match,
                    is_mark_down: true,
                    code: HttpStatus.OK,
                    data: {
                        table: trainingSector,
                    },
                    is_table: true,
                });
            }

            case '328206370126312': {
                const dataHandle = await this.handleModelAndEntitie(wit.entities, modelWit, q);

                const checkPointFollowYear: string[] = [];
                yearData.forEach((year) => {
                    const checkYearMatch = q.includes('' + year.value);
                    if (checkYearMatch) {
                        checkPointFollowYear.push(String(year.value));
                    }
                });

                if (checkPointFollowYear && checkPointFollowYear.length) {
                    const data = await this.pointModel.find({
                        year: {
                            $in: checkPointFollowYear,
                        },
                    });
                    return sendResponse({
                        match_ai: wit.intents[0].confidence,
                        match_query: dataHandle.percent_match,
                        is_mark_down: false,
                        code: HttpStatus.OK,
                        data: data,
                        is_point: true,
                    });
                } else {
                    const data = await this.pointModel.find();
                    return sendResponse({
                        match_ai: wit.intents[0].confidence,
                        match_query: dataHandle.percent_match,
                        is_mark_down: false,
                        code: HttpStatus.OK,
                        data: data,
                        is_point: true,
                    });
                }
            }

            default: {
                let trait = '';
                for (const key in wit.traits) {
                    trait += wit.traits[key];
                }
                if (trait) {
                    return trait;
                }
            }
        }
    }

    getObjectWithMaxConfidence(entities: any): {
        body: string;
        confidence: number;
        name: string;
        role: string;
        value: string;
    } {
        const array = [];
        for (const key in entities) {
            const entitiesArray = entities[key];
            entitiesArray.map((entity: any) => {
                array.push(entity);
            });
        }

        // Kiểm tra xem mảng có phần tử không
        if (array.length === 0) {
            return null; // Hoặc giá trị mặc định phù hợp với trường hợp của bạn
        }

        // Sử dụng reduce để lấy ra object có confidence lớn nhất
        const maxConfidenceObject = array.reduce((maxObject, currentObject) => {
            // So sánh confidence và chọn object có confidence lớn hơn
            return currentObject.confidence > maxObject.confidence ? currentObject : maxObject;
        }, array[0]); // Giả sử phần tử đầu tiên có confidence lớn nhất ban đầu
        return maxConfidenceObject;
    }

    async handleModelAndEntitie(entities: any, model: ModelWit, q: string) {
        const modelEntiti = model.name_unix_model;
        let percentMatch = 0;
        let roleEntitie = '';
        let modelMatch = model;
        const entitie = this.getObjectWithMaxConfidence(entities);
        if (entitie) {
            percentMatch = natural.JaroWinklerDistance(q, entitie.value, {});
            roleEntitie = entitie.role;
        }

        const percent_match_model = natural.JaroWinklerDistance(modelEntiti, roleEntitie, {});
        if (model.name_unix_model !== modelEntiti) {
            modelMatch = await this.witModel.findOne({
                name_unix_model: modelEntiti,
            });
        }

        return {
            is_different_intents: entitie ? percent_match_model < 0.5 : false,
            model_name: modelEntiti,
            percent_match: percentMatch,
            entitie: entitie,
            model: modelMatch,
            percent_match_model,
        };
    }
}
