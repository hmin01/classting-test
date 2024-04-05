import { Module } from '@nestjs/common';
// Controller
import { NewsController } from './news.controller';
// Schema
import NewsModel from './news.model';
// Service
import { NewsService } from './news.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService, NewsModel],
})
export class NewsModule {}
