import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'hello Trello Users by nest,Graphql and MongoDB!';
  }
}
