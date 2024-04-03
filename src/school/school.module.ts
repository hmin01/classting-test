import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
// Controller
import { SchoolController } from './school.controller';
// Schema
import { SchoolSchema } from './school.schema';
// Service
import { SchoolService } from './school.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'School',
        schema: SchoolSchema,
      },
    ]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
