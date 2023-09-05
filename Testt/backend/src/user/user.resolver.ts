import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { TrelloUsers } from './entities/user.entity';
import { CreateTrelloUser } from './dto/create-user.input';
import { UpdateTrelloUser } from './dto/update-user.input';
import { JwtAuthGuard } from 'src/login/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
 import * as bcrypt from 'bcrypt';
@Resolver(() => TrelloUsers)
export class UserResolver {
  
  constructor(private readonly userService: UserService,
    // private readonly JWTService: UserSevice
    ) {}
 
  @Mutation(() => TrelloUsers, { name: 'CreateTrelloUser' })
  async createUser(@Args('CreateTrelloUser') CreateTrelloUser: CreateTrelloUser) {
    const SecData = await bcrypt.genSalt(7);
    CreateTrelloUser.privateKey = SecData
    // console.log("private key displayed : ",CreateTrelloUser.privateKey)
    return this.userService.create(CreateTrelloUser);

  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [TrelloUsers], { name: 'FindAllTrelloUsers' })
  findAll() {
    return this.userService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Query(() => TrelloUsers, { name: 'findTrelloUsersById' })
  findOne(@Args('id') id: UpdateTrelloUser) {
    return this.userService.findOne(id);
  }

  @Query(() => TrelloUsers, { name: 'getTrelloUserByEmail' }) // current working...
  findAUser(@Args('username') email: string) {
    return this.userService.findUser(email);
  }

  @Mutation(() => TrelloUsers , { name: 'updateTrelloUserById' })
  updateUser(@Args("id") id: string ,@Args('UpdateTrelloUser') UpdateTrelloUser: UpdateTrelloUser) {
    return this.userService.updateByid(id, UpdateTrelloUser);
  }

  @Mutation(() => TrelloUsers, { name: 'removeTrelloUserById' })
  removeTrelloUserById(@Args('id') id:string) {
    return this.userService.remove(id);
  }
}
