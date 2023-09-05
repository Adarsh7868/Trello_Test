import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnResolver } from './column.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ColumnSchema } from './entities/column.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:'Column', schema: ColumnSchema }])],

  providers: [ColumnResolver, ColumnService]
})
export class ColumnModule { }
