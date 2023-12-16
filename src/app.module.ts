import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TrainingSectorModule } from './app/training-sector.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        MongooseModule.forRoot(process.env.URL_MONGO),
        TrainingSectorModule,
    ],
})
export class AppModule {}
