import { Module } from '@nestjs/common';
import { YearService } from './year.service';
import { YearController } from './year.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Year, YearSchema } from 'src/schema/yearSchema/year.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Year.name,
                schema: YearSchema,
            },
        ]),
    ],
    controllers: [YearController],
    providers: [YearService],
})
export class YearModule {}
