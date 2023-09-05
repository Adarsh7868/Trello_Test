import { Injectable } from '@nestjs/common';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { TrelloBoard } from './entities/board.entity';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UseGuards } from '@nestjs/common';


@Injectable()
export class BoardService {

  constructor(@InjectModel(TrelloBoard.name)
  private boardModel: mongoose.Model<TrelloBoard>
  ) { }


  async create(CreateBoardInput: CreateBoardInput) {
    return await this.boardModel.create(CreateBoardInput);
  }

  async findAll() {
    return await this.boardModel.find();
  }

  // async getUsersBoard() {
  //   const pBoard = await this.boardModel.aggregate([
  //     {
  //       $lookup: {
  //         from: 'users',
  //         localField: 'userId',
  //         foreignField: '_id',
  //         as: 'ColumnList'

  //       }
  //     },
  //     {
  //       $project: {
  //         _id: 1,
  //         name: 1,
  //         ColumnList: {
  //           _id: 1,
  //           title: 1,
  //           boardId: 1,
  //           TaskList: {
  //             _id: 1,
  //             Title: 1,
  //             index: 1,
  //             Description: 1,
  //             Column: 1
  //           }
  //     }
  //   }
  // },
  // {
  //   $sort: {
  //     _id: 1
  //   }
  // }
  // ]);
  // console.log("User Board d", pBoard);
  // return pBoard;

  // }

  // *********************************************************************
  async GetBoardById(id: string) {
    try {
      const columns = await this.boardModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id)
          }
        },
        {
          $lookup: {
            from: 'columns',
            let: { b_Id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$boardId', '$$b_Id']
                  }
                }
              },
              {
                $lookup: {
                  from: 'tasks',
                  let: { columnId: '$_id' },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ['$Column', '$$columnId']
                        }
                      }
                    },
                    {
                      $sort : {
                        index : 1
                      }
                    }
                  ],
                  as: 'TaskList'
                }
              }
            ],
            as: 'ColumnList'
          }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            ColumnList: {
              _id: 1,
              title: 1,
              boardId: 1,
              TaskList: {
                _id: 1,
                Title: 1,
                index: 1,
                Description: 1,
                Column: 1
              }
            }
          }
        },
        {
          $sort: {
            _id: 1
          }
        }

      ]);

      const lookup = columns[0] || null
      console.log('lookup', lookup);
      return lookup;
    } catch (error) {
      console.error('Error fetching board with columns:', error);
      throw error;
    }
  }

  // async findColumnInBoard() {
  //   const ColInBoard = await this.boardModel.aggregate([
  //     {
  //       $lookup: {
  //         from: 'columns',
  //         let: { b_Id: '$_id' },
  //         pipeline: [
  //           {
  //             $match: {
  //               $expr: {
  //                   $eq: ['$boardId', '$$b_Id']
  //             },
  //             },
  //           },
  //           {
  //             $sort: { index: 1 },
  //           },
  //         ],
  //         as: 'ColumnList',
  //       },
  //     },
  //     {
  //       $project: {
  //         _id: 1,
  //         name: 1,
  //         ColumnList: {
  //           _id: 1,
  //           Title: 1,
  //           boardId: 1,
  //           TaskList: {
  //             _id: 1, 
  //             Title: 1,
  //             index: 1,
  //             Description: 1,
  //             Column: 1,

  //         },
  //       },
  //     },
  //   },
  //   {
  //     $sort: {
  //       _id: 1,
  //     },
  //   },
  //   ]);

  //   return ColInBoard;
  // }

  async findColumnInBoard() {
    const ColInBoard = await this.boardModel.aggregate([
      {
        $lookup: {
          from: 'columns',
          let: { b_Id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$boardId', '$$b_Id']
                },
              },
            },
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
                  },
                ],
                as: 'TaskList',
              },
            },

          ],
          as: 'ColumnList',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          ColumnList: {
            _id: 1,
            title: 1,
            boardId: 1,
            TaskList: {
              _id: 1,
              Title: 1,
              index: 1,
              Description: 1,
              Column: 1,
            },
          },
        },
      }

    ]);

    return ColInBoard;
  }


  async update(id: string, updateBoardInput: UpdateBoardInput) {
    return await this.boardModel.findByIdAndUpdate(id, updateBoardInput);
  }

  async remove(id: string) {
    return await this.boardModel.findByIdAndRemove(id);
  }
}
