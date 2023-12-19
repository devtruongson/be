import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<ModelWit>;

@Schema({
    timestamps: true,
})
export class ModelWit {
    @Prop({ type: String, text: true })
    title: string;

    @Prop()
    code_model: string;

    @Prop()
    name_unix_model: string;
}

export const ModelWitSchema = SchemaFactory.createForClass(ModelWit);
