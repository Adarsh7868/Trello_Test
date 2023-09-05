import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardResolver } from './board.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardSchema } from './entities/board.entity';

@Module({
  imports : [MongooseModule.forFeature([{ name: 'TrelloBoard', schema: BoardSchema }]),],
  providers: [BoardResolver, BoardService]
})
export class BoardModule {}
