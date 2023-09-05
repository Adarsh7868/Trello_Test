import { CreateColumnInput } from './create-column.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateColumnInput {
  
  @Field()
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  boardId: string;
}
