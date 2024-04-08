import { Module } from '@nestjs/common';
// Controller
import { NewsController } from './news.controller';
// Repository
import { NewsRepository } from '@repository/news.repository';
// Schema
import NewsSchema, { NewsSchemaName } from '@/schema/news.schema';
// Service
import { NewsService } from './news.service';
import { DynamooseModule } from 'nestjs-dynamoose';

@Module({
  imports: [DynamooseModule.forFeature([{ name: NewsSchemaName, schema: NewsSchema }])],
  controllers: [NewsController],
  providers: [NewsRepository, NewsService],
  exports: [NewsRepository],
})
export class NewsModule {}
