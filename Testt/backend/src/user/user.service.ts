import { Injectable } from '@nestjs/common';
import { CreateTrelloUser } from './dto/create-user.input';
import { UpdateTrelloUser } from './dto/update-user.input';
import { TrelloUsers } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';


@Injectable()
export class UserService {
  
  constructor(
    @InjectModel (TrelloUsers.name)
    private userModel: mongoose.Model<TrelloUsers>
){}

  async findAll():Promise<TrelloUsers[]> {
    return await this.userModel.find();
  }

  async create(CreateTrelloUser: CreateTrelloUser): Promise<TrelloUsers>{
    return await this.userModel.create(CreateTrelloUser);
  }

  async findOne(id: CreateTrelloUser):Promise<TrelloUsers> {
    return await this.userModel.findOne(id);
  }

  async findUser(email: string):Promise<TrelloUsers> {  // find TreUser By Email
      return await this.userModel.findOne({ email:email});

  }
  async updateByid(id: string, UpdateTrelloUser: UpdateTrelloUser): Promise<TrelloUsers> {
    return await this.userModel.findByIdAndUpdate(id, UpdateTrelloUser);
  }

  async remove(id: string): Promise<TrelloUsers> {
    return await this.userModel.findByIdAndRemove(id);
  }
}
