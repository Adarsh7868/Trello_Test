import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ColumnService } from './column.service';
import { Column } from './entities/column.entity';
import { CreateColumnInput } from './dto/create-column.input';
import { UpdateColumnInput } from './dto/update-column.input';

@Resolver(() => Column)
export class ColumnResolver {

  constructor(private readonly columnService: ColumnService) {}

  @Mutation(() => Column , { name: 'createColumn' })
  createColumn(@Args('createColumnInput') createColumnInput: CreateColumnInput) {
    return this.columnService.createColumn(createColumnInput);
  }

  @Query(() => [Column], { name: 'getAllColumn' })
  findAll() {
    return this.columnService.findAll();
    
  }

  @Query(() => Column, { name: 'getColumnById' })
  findOne(@Args('id') id: string ) {
    return this.columnService.findOne(id);
  }

  @Query(() => [Column], { name: 'getTasksinColumn' })
  getTasksinColumn(){
    return this.columnService.getTasksInColumn();
  }

  // @Mutation(() => Column)
  // updateColumn( @Args('id') id: string,
  //   @Args('updateColumnInput') updateColumnInput: UpdateColumnInput) {
  //   return this.columnService.update(id, updateColumnInput);
  // }

  @Mutation(() => Column, { name: 'removeColumn' })
  removeColumn(@Args('id') id: string) {
    return this.columnService.removeColumn(id);
  }
}
