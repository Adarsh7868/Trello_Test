import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './user/user.resolver';
import { LoginResolver } from './login/login.resolver';
import { LoginService } from './login/login.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstant } from './login/constant';
import { LoginModule } from './login/login.module';
import { UserService } from './user/user.service';
import { BoardModule } from './board/board.module';
import { ColumnModule } from './column/column.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    UserModule,
    LoginModule,
    BoardModule,
    ColumnModule,
    TasksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      autoSchemaFile:join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal : true
    }),
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '7h' },
    }),
    MongooseModule.forRoot(process.env.DB_URI),
  ],
  // controllers: [],
  providers: [AppService,UserResolver],
})
export class AppModule {}
