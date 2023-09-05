import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginResolver } from './login.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { loginschema } from './entities/login.entity';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './constant';
import { JwtStrategy } from './JWT.strategy';
// import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({ 
          secret : jwtConstant.secret,
          signOptions: { expiresIn: '7h' },
        }),
    MongooseModule.forFeature([{name:'Login', schema:loginschema }]),],
  providers: [LoginResolver, LoginService, JwtStrategy]
})
export class LoginModule {}
