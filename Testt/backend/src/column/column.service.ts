import { Injectable } from '@nestjs/common';
import { CreateColumnInput } from './dto/create-column.input';
import { UpdateColumnInput } from './dto/update-column.input';
import * as mongoose from 'mongoose';
import { Column } from './entities/column.entity';
import { InjectModel } from '@nestjs/mongoose';
import { last } from 'rxjs';
import { arrayBuffer } from 'stream/consumers';

@Injectable()
export class ColumnService {

  constructor(
    @InjectModel(Column.name)
    private columnModel: mongoose.Model<Column>
  ) { }

  async createColumn(createColumnInput: CreateColumnInput) {
    return await this.columnModel.create(createColumnInput);
  }

  async findAll() {
    const All = await this.columnModel.find();
    // All.reverse();
    // console.log("All data", All)
    return All;
  }

  async findOne(id: string) {
    return await this.columnModel.findById(id);
  }

  async getTasksInColumn() {
    const columnsWithTasks = await this.columnModel.aggregate([
      {
        $lookup: {
          from: 'tasks',
          let: { columnId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                   $eq: ['$Column', '$$columnId']
              },
              },
            },
            {
              $sort: {
                index: 1,
              },
            }
          ],
          as: 'TaskList',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          boardId: 1,
          TaskList: {
            _id: 1,
            Title: 1, 
            Description: 1,
            Column: 1,
            index: 1
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  
    const data = columnsWithTasks || []
    console.log("all order ", data);
    return data;
  }

  async removeColumn(id: string){
    const column = await this.columnModel.findByIdAndDelete(id);
    return column;
  }
  
}
  // async getTasksInColumn() {
  //     const columnsWithTasks = await this.columnModel.aggregate([
  //       {
  //         $lookup: {
  //           from: 'tasks',
  //           let: { columnId: '$_id' },
  //           pipeline: [
  //             {
  //               $match: {
  //                 $expr: {
  //                   $eq: ['$Column', '$$columnId']
  //                 },
  //               },
  //             },
  //             {
  //               $sort: {
  //                 index: 1,
  //               },
  //             },
  //           ],
  //           as: 'TaskList',
  //         },
  //       },
  //       {
  //         $project: {
  //           _id: 1,
  //           title: 1,
  //           boardId: 1,
  //           TaskList: {
  //             _id: 1,
  //             Title: 1,
  //             Description: 1,
  //             Column: 1,
  //             index: 1
  //           },
  //         },
  //       },
  //       {
  //         $sort: {
  //           _id: 1,
  //         },
  //       },
  //     ]);

  //     const data = columnsWithTasks;
  //     console.log("all order ", data);
  //     return data;
  //   }



//         This giving all 3 columns but not able to handle null object in it.
//   async getTasksInColumn() {
//     const columnsWithTasks = await this.columnModel.aggregate([
//       {
//         $lookup: {
//           from: 'tasks',
//           localField: '_id',
//           foreignField: 'Column',
//           as: 'TaskList',
//         },
//       },
//       {
//         $unwind: {
//           path: '$TaskList',
//           // preserveNullAndEmptyArrays: true,
//         },
//       },
//       {
//         $sort: {
//           'TaskList.index': 1,
//         },
//       },
//       {
//         $group: {
//           _id: {
//             _id: '$_id',
//             title: '$title',
//           },
//           TaskList: {
//             $push: {
//               _id: '$TaskList._id ',
//               Title: '$TaskList.Title ',
//               Description: '$TaskList.Description ',
//               Column: '$TaskList.Column ',
//               index: '$TaskList.index',
//             },
//           },
//         },

//       },
//       {
//         $project: {
//           _id: '$_id._id',
//           title: '$_id.title',
//           TaskList: '$TaskList',
        
//         },
//       },

//       {
//         $sort: {
//           '_id': 1,
//         },
//       },
//     ]);
  
//     const data = columnsWithTasks;
//     console.log("all order ", data);
//     return data;
//   }
  
  
  
//   update(id: number, updateColumnInput: UpdateColumnInput) {
//     return `This action updates a #${id} column`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} column`;
//   }
// }

