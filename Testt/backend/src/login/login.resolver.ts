import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LoginService } from './login.service';
import { Login } from './entities/login.entity';
import { CreateLoginInput } from './dto/create-login.input';
import { create } from 'domain';

@Resolver(() => Login)
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Mutation(() => Login, { name: 'UserLogin' })
  createLogin(@Args('createLoginInput') createLoginInput: CreateLoginInput) {
    return this.loginService.create(createLoginInput);
  }

  // @Query(() => [Login], { name: 'login' })
  // findAll() {
  //   return this.loginService.findAll();
  // }

  @Mutation(() => String, { name: 'LoginTrello' })
  findOne(@Args('email') email: string  ,@Args('password') password: string) {
    return this.loginService.findUser(email , password); 
  }

  // @Mutation(() => Login)
  // updateLogin(@Args('updateLoginInput') updateLoginInput: CreateLoginInput) {
  //   return this.loginService.update(updateLoginInput.id, updateLoginInput);
  // }

  // @Mutation(() => Login)
  // removeLogin(@Args('id', { type: () => Int }) id: number) {
  //   return this.loginService.remove(id);
  // }
}
