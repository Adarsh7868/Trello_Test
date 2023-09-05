import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Column } from 'src/column/entities/column.entity';

@Schema()
@ObjectType()
export class TrelloBoard {

  @Field()
  _id: string;

  @Prop()
  @Field()
  name: string

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Columns' }])
  @Field(() => [Column] , {nullable: true})
  ColumnList: string[]
  
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // @Field(()=> String , {nullable: true})
  // userId: string

}

export const BoardSchema = SchemaFactory.createForClass(TrelloBoard);
