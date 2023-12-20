import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Year } from '../yearSchema/year.schema';

export type PointDocument = HydratedDocument<Point>;

@Schema({
    timestamps: true,
})
export class Point {
    @Prop({ type: String, text: true })
    title: string;

    @Prop({ type: Types.ObjectId, ref: Year.name })
    year: string;

    @Prop()
    file: string;

    @Prop()
    type: string;

    @Prop()
    image_url: string[];

    @Prop()
    content_mark_down: string;

    @Prop()
    content_html: string
}

export const PointSchema = SchemaFactory.createForClass(Point);
