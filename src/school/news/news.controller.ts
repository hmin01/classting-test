import {
  Body,
  Controller,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// DTO
import { CreateNewsDto, UpdateNewsDto } from './news.dto';
// HTTP Method
import { Delete, Get, Patch, Post } from '@nestjs/common';
// Interface
import { News } from './news.schema';
// Service
import { NewsService } from './news.service';

@Controller('school/news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Delete('/item')
  remove(
    @Query('school_id', ValidationPipe) school: string,
    @Query('created_at', ValidationPipe) createdAt: number,
  ): Promise<string> {
    return this.newsService.remove(school, createdAt);
  }

  @Get('/item')
  findOneById(
    @Query('school_id', ValidationPipe) school: string,
    @Query('created_at', ParseIntPipe) createdAt: number,
  ): Promise<News> {
    return this.newsService.findOne(school, createdAt);
  }

  @Patch('/item')
  @UsePipes(ValidationPipe)
  update(@Body() updateNewsDto: UpdateNewsDto): Promise<News> {
    return this.newsService.update(updateNewsDto);
  }

  @Post('/item')
  @UsePipes(ValidationPipe)
  create(@Body() createNewsDto: CreateNewsDto): Promise<News> {
    return this.newsService.create(createNewsDto);
  }
}
