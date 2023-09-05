import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLoginInput {

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  phone: string;
}
