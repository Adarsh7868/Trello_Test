import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { TrelloBoard } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { JwtAuthGuard } from 'src/login/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => TrelloBoard)
export class BoardResolver {
  constructor(private readonly boardService: BoardService) { }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => TrelloBoard, { name: 'createBoard' })
  async createBoard(@Args('CreateBoardInput') CreateBoardInput: CreateBoardInput,
    // @Context() context: any
    ) {

    // CreateBoardInput.userId = context.req.user._id
    console.log("CreateBoardInput", CreateBoardInput)
    const data = await this.boardService.create(CreateBoardInput)
    return data;
  }
 
  @Query(() => [TrelloBoard], { name: 'getAllBoard' })
  getAllBoard() {
    return this.boardService.findAll();
  }

  @Query(() => TrelloBoard, { name: 'GetBoardById' }) // current working...
  GetBoardById(@Args('id') id: string) {
    return this.boardService.GetBoardById(id);
  }

  @Query(() => [TrelloBoard], { name: 'getColumnInBoard' })  //not used yet!
  findColumnInBoard() {
    return this.boardService.findColumnInBoard();
  }

  @Mutation(() => TrelloBoard, { name: 'updateBoard' })
  updateBoard(@Args('id') id: string,
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput) {
    return this.boardService.update(id, updateBoardInput);
  }

  @Mutation(() => TrelloBoard, { name: 'removeBoard' })
  removeBoard(@Args('id') id: string) {
    return this.boardService.remove(id);
  }
}
