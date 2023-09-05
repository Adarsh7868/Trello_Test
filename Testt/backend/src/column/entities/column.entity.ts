import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { StringSchemaDefinition, mongo } from 'mongoose';
import { Task } from 'src/tasks/entities/task.entity';

@Schema()
@ObjectType()
export class Column {

  @Field(() => String)
  _id: string;

  @Prop()
  @Field(() => String)
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Board' })
  @Field(() => String, { nullable: true })
  boardId: string

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }])
  @Field(() => [Task],  { nullable: true })
  TaskList: string[];

}
export const ColumnSchema = SchemaFactory.createForClass(Column);

