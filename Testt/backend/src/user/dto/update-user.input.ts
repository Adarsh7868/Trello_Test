// DTO: Data Transfer Object
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTrelloUser{
  
@Field({nullable: true})
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password : string;

  @Field(() => String)
  phone: string;
  
  @Field({nullable: true})
  privateKey: string;
}
