import { Module } from '@nestjs/common';
// Controller
import { SubscribeController } from './subscribe.controller';
// Module
import { DynamooseModule } from 'nestjs-dynamoose';
// Schema
import { NewsSchema } from 'src/school/news/news.schema';
import { SubscribeSchema } from './subscribe.schema';
// Service
import { NewsService } from 'src/school/news/news.service';
import { SubscribeService } from './subscribe.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'classting-news',
        schema: NewsSchema,
      },
      {
        name: 'classting-subscribe',
        schema: SubscribeSchema,
      },
    ]),
  ],
  controllers: [SubscribeController],
  providers: [SubscribeService, NewsService],
})
export class SubscribeModule {}
