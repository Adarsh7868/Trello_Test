import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLoginInput } from './dto/create-login.input';
import { Login } from './entities/login.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './JWTPayload';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Login.name)
    private loginModel: mongoose.Model<Login>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async create(createLoginInput: CreateLoginInput): Promise<Login> {
    return await this.loginModel.create(createLoginInput);
  }

  // findAll() {
  //   return `This action returns all login`;
  // }

  async findUser(email: string, password: string) {

    const user = await this.userService.findUser(email);

    if (!user || user.password !== password) {
      throw new UnauthorizedException("User credentials didn't exists. REGISTER FIRST!");
    }
    const payload: JwtPayload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      privateKey: user.privateKey
    }

    const token = this.jwtService.sign(payload);
    // console.log(token)
    // localStorage.setItem('Token',token)
    return token;
  }
  // update(id: number, updateLoginInput: UpdateLoginInput) {
  //   return `This action updates a #${id} login`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} login`;
  // }



}
