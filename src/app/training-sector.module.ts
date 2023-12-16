import { Module } from '@nestjs/common';
import { TrainingSectorService } from './TrainingSector.Service';
import { TrainingSectorController } from './training-sector.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingSector, TrainingSectorSchema } from 'src/schema/TrainingSectorSchema/TrainingSectors.schema';
import { Contact, ContactSchema } from 'src/schema/contactSchema/contact.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TrainingSector.name, schema: TrainingSectorSchema },
            { name: Contact.name, schema: ContactSchema },
        ]),
    ],
    controllers: [TrainingSectorController],
    providers: [TrainingSectorService],
})
export class TrainingSectorModule {}
