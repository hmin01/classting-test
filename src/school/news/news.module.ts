import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
// Controller
import { NewsController } from './news.controller';
// Schema
import { NewsSchema } from './news.schema';
// Service
import { NewsService } from './news.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'classting-news',
        schema: NewsSchema,
      },
    ]),
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
