import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTrelloUser{
  
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password : string;

  @Field(() => String)
  phone: string;

  @Field({nullable:true})
  privateKey: string;
}
