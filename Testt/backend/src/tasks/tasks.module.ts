import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { Mongoose } from 'mongoose';
import { Task, TaskSchema } from './entities/task.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forFeature([{ name:'Task', schema: TaskSchema}]),],
  providers: [TasksResolver, TasksService]
})
export class TasksModule {}
