import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TUserSchema } from './entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'TrelloUsers', schema: TUserSchema }])],
   providers: [UserResolver, UserService],
  exports: [UserResolver,UserService]
})
export class UserModule {}
