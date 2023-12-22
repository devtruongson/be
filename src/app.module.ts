import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TrainingSectorModule } from './trainingSector/training-sector.module';
import { InfoModule } from './info/info.module';
import { ModelWitModule } from './model-wit/model-wit.module';
import { YearModule } from './year/year.module';
import { RuntimeAiModule } from './runtime_ai/runtime_ai.module';
import { PointModule } from './point/point.module';
import { UploadModule } from './upload/upload.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        MongooseModule.forRoot(process.env.URL_MONGO),
        TrainingSectorModule,
        InfoModule,
        ModelWitModule,
        YearModule,
        RuntimeAiModule,
        PointModule,
        UploadModule,
    ],
})
export class AppModule {}
