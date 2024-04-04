import { Module } from '@nestjs/common';
// Controller
import { SchoolController } from './school.controller';
// Module
import { DynamooseModule } from 'nestjs-dynamoose';
import { SubscribeModule } from './subscribe/subscribe.module';
import { NewsModule } from './news/news.module';
// Schema
import { SchoolSchema } from './school.schema';
// Service
import { SchoolService } from './school.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'classting-school',
        schema: SchoolSchema,
      },
    ]),
    NewsModule,
    SubscribeModule,
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
