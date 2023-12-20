import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Point, PointSchema } from 'src/schema/pointSchema/point.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        MulterModule.register({
            dest: './upload',
        }),
        MongooseModule.forFeature([
            {
                name: Point.name,
                schema: PointSchema,
            },
        ]),
    ],
    controllers: [PointController],
    providers: [PointService],
})
export class PointModule {}
