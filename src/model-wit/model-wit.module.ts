import { Module } from '@nestjs/common';
import { ModelWitService } from './model-wit.service';
import { ModelWitController } from './model-wit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelWit, ModelWitSchema } from 'src/schema/modelSchema/model.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ModelWit.name,
                schema: ModelWitSchema,
            },
        ]),
    ],
    controllers: [ModelWitController],
    providers: [ModelWitService],
})
export class ModelWitModule {}
