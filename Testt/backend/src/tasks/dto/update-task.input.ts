import { CreateTaskInput } from './create-task.input';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput{

  @Field(() => String)
  Title: string;

  @Field(() => String)
  Description: string;

  @Field(() => Int,{nullable: true})
  index: number;

  @Field(() => String, {nullable: true})
  Column: string;


}
