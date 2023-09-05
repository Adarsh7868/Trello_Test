import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './JWTPayload';
import { jwtConstant } from './constant';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstant.secret
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        const { email, password } = payload;

        console.log("Payload data of login:", payload)

        const user = await this.userService.findUser(email);


        if (!user || user.password !== password) {
            throw new UnauthorizedException('Invalid token');
        }
        return {
            _id: payload._id,
            name: payload.name,
            email: payload.email,
            password: payload.password,
            privateKey: payload.privateKey
        };
    }
}