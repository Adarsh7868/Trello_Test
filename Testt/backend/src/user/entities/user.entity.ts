import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
@ObjectType()
export class TrelloUsers {
  @Field()
  _id: string;

  @Prop()
  @Field()
  name: string;

  @Prop({unique: true})
  @Field()
  email: string;

  @Prop()
  @Field()
  password : string;

  @Prop()
  @Field()
  phone: string;

  @Prop()
  @Field({nullable:true})
  privateKey: string;
  
}
export const TUserSchema = SchemaFactory.createForClass(TrelloUsers);
