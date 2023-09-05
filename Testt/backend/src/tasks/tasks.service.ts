import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectModel(Task.name)
    private taskModel: mongoose.Model<Task>
  ) {}


  async createTask(createTaskInput: CreateTaskInput) {

    // only selected column values:
    const thisColumnIndex = await this.taskModel.find({ Column: createTaskInput.Column });
    // console.log("This Columnn data", thisColumnIndex);

    // providing indexing 1 each time, when new task is created and adding +1 to  all remaining indexes.

    console.log("current columnIndex", thisColumnIndex)

    // for(let i=0; i<thisColumnIndex.length; i++) {
    // await this.taskModel.findByIdAndUpdate(thisColumnIndex[i].id,{ index: thisColumnIndex[i].index + 1 });
    //   console.log("This column data : ", thisColumnIndex[i]);       
    // }
    await this.taskModel.updateMany({ Column: createTaskInput.Column }, { $inc: { index: 1 } })

    createTaskInput.index = 1
    return await this.taskModel.create(createTaskInput)
  }

  findByColumn(Column: string) {
    throw new Error('Method has yet to implement....!');
  }

  // ##############################################################################################
  async swapTasks(taskId1: string, taskId2: string): Promise<any> {

    const Column1 = await this.taskModel.findById(taskId1)
    const Column2 = await this.taskModel.findById(taskId2)

    console.log("before string convert ", Column1.Column)

    console.log("Column1 : ", Column1.Column.toString());//just to check
    console.log("Column2 : ", Column2.Column.toString());

    if (Column1.Column.toString() == Column2.Column.toString()) {

      console.log("after string convert ", Column1.Column.toString());

      const temp = Column1.index;
      Column1.index = Column2.index;
      Column2.index = temp;

      await Promise.all([
        this.taskModel.findByIdAndUpdate(taskId1, { index: Column1.index }),
        this.taskModel.findByIdAndUpdate(taskId2, { index: Column2.index },)
      ]);
      // console.log("after task1", Column1);
      return [Column1, Column2]

    }          
  }

  //*************************Column_Swap************************************ */

  async swapColumn(taskId1: string, Columnid: string, Index: number): Promise<any> {

    const colLength = await this.taskModel.find({Column: Columnid})
    console.log("Column length ", colLength.length)

    if( Columnid != taskId1) {

        if(Index > 0 && Index <= colLength.length +1) {

      const task_deleted = await this.DeleteTask(taskId1)
    console.log("Deleted and updated this column ", task_deleted)

    await this.taskModel.updateMany({ Column: Columnid, index: { $gt: Index - 1 } }, { $inc: { index: 1 } })
    console.log("task deleted to object ", task_deleted.toObject())

    const taskToAdd = { ...task_deleted.toObject(), index: Index, Column: Columnid };
    console.log("task to add data ", taskToAdd)
    const addedTask = await this.taskModel.create(taskToAdd);
    console.log("added task data ", addedTask)

    return [task_deleted, addedTask];

    }
    else 
    { throw new NotFoundException("Invalid Index error !! ") }
    
  }
  else
    throw new NotFoundException("Invalid Column_id string !! ")
  }

  
  // async swapColumn(taskId1: string, Columnid: string, Index:number): Promise<any> {

  //   const task_deleted = await this.DeleteTask(taskId1)
  //   console.log("Deleted and updated this column ", task_deleted)

  //   await this.taskModel.updateMany({Column: Column2.Column, index: {$gt: Index - 1 }}, {$inc: {index: 1}})
  // console.log("task deleted to object ", task_deleted.toObject())

  //   const taskToAdd = { ...task_deleted.toObject(), index: Index, Column: Column2.Column };
  //   console.log("task to add data ", taskToAdd)
  //       const addedTask = await this.taskModel.create(taskToAdd);
  //   console.log("added task data ", addedTask)
  //     return [task_deleted, addedTask];

  // }

  // ##############################################################################################
  async findAll() {
    return await this.taskModel.find();
  }

  async findOne(id: string) {
    return await this.taskModel.findById(id)
  }

  async update(id: string, updateTaskInput: UpdateTaskInput) {
    return await this.taskModel.findByIdAndUpdate(id, updateTaskInput);

  }

  async DeleteTask(id: string) {

    const taskId = await this.taskModel.findById(id);
    // console.log("fetched taskId", taskId)

    const thisColumnIndex = await this.taskModel.find({ Column: taskId });

    const deleted = await this.taskModel.findByIdAndRemove(id)
    // console.log("This 'id' suppose to shift in new coluumnShifted", taskId)
    // update the index of particular column after deleting a task
    const updated = await this.taskModel.updateMany({ Column: taskId.Column, index: { $gt: taskId.index } }, { $inc: { index: -1 } })

    return deleted
  }
}
