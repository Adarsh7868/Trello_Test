import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
@ObjectType()
export class Task {

  @Field(() => String)
  _id: string;

  @Prop()
  @Field(() => String)
  Title: string;

  @Prop()
  @Field()
  Description: string;

  @Prop()
  @Field(() => Int, {nullable: true})
  index: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Columns' })
  @Field(() => String)
  Column: string
  
}
export const TaskSchema = SchemaFactory.createForClass(Task);
