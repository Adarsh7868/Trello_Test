import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  
  @Field()
  Title: string;

  @Field()
  Description: string;

  @Field(() => Int,{nullable: true})
  index: number;

  @Field(() => String)
  Column: string;
}
