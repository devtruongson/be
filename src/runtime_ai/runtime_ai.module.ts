import { Module } from '@nestjs/common';
import { RuntimeAiService } from './runtime_ai.service';
import { RuntimeAiController } from './runtime_ai.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Info, InfoSchema } from 'src/schema/infoSchema/info.schema';
import { Year, YearSchema } from 'src/schema/yearSchema/year.schema';
import { ModelWit, ModelWitSchema } from 'src/schema/modelSchema/model.schema';
import { TrainingSector, TrainingSectorSchema } from 'src/schema/TrainingSectorSchema/TrainingSectors.schema';
import { ModelWitService } from 'src/model-wit/model-wit.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Info.name,
                schema: InfoSchema,
            },
            {
                name: Year.name,
                schema: YearSchema,
            },
            {
                name: ModelWit.name,
                schema: ModelWitSchema,
            },
            {
                name: TrainingSector.name,
                schema: TrainingSectorSchema,
            },
        ]),
    ],
    controllers: [RuntimeAiController],
    providers: [RuntimeAiService, ModelWitService],
})
export class RuntimeAiModule {}
