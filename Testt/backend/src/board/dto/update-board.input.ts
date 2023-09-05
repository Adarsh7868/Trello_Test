import { CreateBoardInput } from './create-board.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBoardInput{

  @Field( {nullable: true})
  id : string;

  @Field()
  name: string;

  @Field(() => String)
  userId:string
  
}
