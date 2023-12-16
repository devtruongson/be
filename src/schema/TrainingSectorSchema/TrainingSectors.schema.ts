import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<TrainingSector>;

@Schema({
    timestamps: true,
})
export class TrainingSector {
    @Prop({ type: String, text: true })
    name: string;

    @Prop()
    master: number;

    @Prop()
    university: number;

    @Prop()
    college: number;

    @Prop({
        default: true,
    })
    is_active: boolean;

    @Prop()
    url_path: string;

    @Prop()
    iframe_url: string;

    @Prop()
    description: string;
}

export const TrainingSectorSchema = SchemaFactory.createForClass(TrainingSector);
