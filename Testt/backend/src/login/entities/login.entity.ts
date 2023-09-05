import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import exp from 'constants';

@Schema()
@ObjectType()
export class Login {

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field()
  password: string;

  @Prop()
  @Field()
  phone: string;
}
export const loginschema = SchemaFactory.createForClass(Login);

