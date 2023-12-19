import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TrainingSectorModule } from './trainingSector/training-sector.module';
import { InfoModule } from './info/info.module';
import { ModelWitModule } from './model-wit/model-wit.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        MongooseModule.forRoot(process.env.URL_MONGO),
        TrainingSectorModule,
        InfoModule,
        ModelWitModule,
    ],
})
export class AppModule {}
