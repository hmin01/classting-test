import { Module } from '@nestjs/common';
// Controller
import { SchoolController } from './school.controller';
// Module
import { DynamooseModule } from 'nestjs-dynamoose';
import { NewsModule } from './news/news.module';
// Schema
import { SchoolSchema } from './school.schema';
import { SubscribeSchema } from 'src/subscribe/subscribe.schema';
// Service
import { SchoolService } from './school.service';
import { SubscribeService } from 'src/subscribe/subscribe.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'classting-school',
        schema: SchoolSchema,
      },
      {
        name: 'classting-subscribe',
        schema: SubscribeSchema,
      },
    ]),
    NewsModule,
  ],
  controllers: [SchoolController],
  providers: [SchoolService, SubscribeService],
})
export class SchoolModule {}
