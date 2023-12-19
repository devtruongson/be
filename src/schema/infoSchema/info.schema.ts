import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ModelWit } from '../modelSchema/model.schema';

export type CatDocument = HydratedDocument<Info>;

@Schema({
    timestamps: true,
})
export class Info {
    @Prop({ type: String, text: true })
    title: string;

    @Prop()
    content_mark_down: string;

    @Prop()
    content_html: string;

    @Prop({
        default: true,
    })
    is_active: boolean;

    @Prop({ type: Types.ObjectId, ref: ModelWit.name })
    model: string;
}

export const InfoSchema = SchemaFactory.createForClass(Info);
