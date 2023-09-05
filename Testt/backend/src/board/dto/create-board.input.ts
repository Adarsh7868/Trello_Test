import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput{

  @Field({nullable: true})
  _id: string;

  @Field()
  name: string

  // @Field(() => String)
  // userId:string
}
