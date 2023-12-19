import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({
    timestamps: true,
})
export class Contact {
    @Prop()
    title: string;

    @Prop({ type: String, text: true })
    location: string;

    @Prop()
    province: string;

    @Prop()
    iframe_url: string;

    @Prop({
        default: true,
    })
    is_active: boolean;

    @Prop({ type: [] })
    phone_number: string[];

    @Prop()
    description: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
