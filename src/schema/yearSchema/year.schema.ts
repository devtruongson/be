import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type YearDocument = HydratedDocument<Year>;

@Schema({
    timestamps: true,
})
export class Year {
    @Prop({ type: String, text: true })
    title: string;

    @Prop()
    code_year: string;
}

export const YearSchema = SchemaFactory.createForClass(Year);
