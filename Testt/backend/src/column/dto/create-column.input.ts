import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateColumnInput {
  
  @Field({nullable: true})
  _id : string;

  @Field(() =>String)
  title: string

  @Field(() => String)
  boardId: string;

}
