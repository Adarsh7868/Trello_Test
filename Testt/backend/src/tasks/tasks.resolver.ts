import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Resolver(() => Task)
export class TasksResolver {

  constructor(private readonly tasksService: TasksService) { }

  @Mutation(() => Task, { name: 'createTask' })
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.createTask(createTaskInput);
  }

  @Query(() => [Task], { name: 'getAllTasks' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Query(() => Task, { name: 'getTaskById' })
  findOne(@Args('id') id: string) {
    return this.tasksService.findOne(id);
  }


  @Mutation(() => Task, { name: 'updateTask' })
  updateTask(@Args('id') id: string,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(id, updateTaskInput);
  }

  @Mutation(() => Task, { name: 'DeleteTask' })
  removeTask(@Args('id') id: string) {

    return this.tasksService.DeleteTask(id);
  }

  @Mutation(() => [Task], { name: 'swapTasks' })
  async swapTasks(@Args('taskId1') taskId1: string,
    @Args('taskId2') taskId2: string
  ) {
    return this.tasksService.swapTasks(taskId1, taskId2);
  }

  @Mutation(() => [Task], { name: 'swapColumn' })
  async swapTasksInSameColumn(@Args('taskId1') taskId1: string,
    @Args('column') column: string,
    @Args('index') index: number
  ) {
    return await this.tasksService.swapColumn(taskId1, column, index);

  }
}
