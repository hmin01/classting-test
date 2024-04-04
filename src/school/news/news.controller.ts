import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// DTO
import { CreateNewsDto, UpdateNewsDto } from './news.dto';
// HTTP Method
import { Delete, Get, Post } from '@nestjs/common';
// Interface
import { News } from './news.schema';
// Service
import { NewsService } from './news.service';

@Controller('school/news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createNewsDto: CreateNewsDto): Promise<News> {
    return this.newsService.create(createNewsDto);
  }

  @Delete()
  remove(
    @Query('school_id', ValidationPipe) school: string,
    @Query('created_at', ValidationPipe) createdAt: number,
  ): Promise<string> {
    return this.newsService.remove(school, createdAt);
  }

  @Get()
  findOneById(
    @Query('school_id', ValidationPipe) school: string,
    @Query('created_at', ParseIntPipe) createdAt: number,
  ): Promise<News> {
    return this.newsService.findOneById(school, createdAt);
  }

  @Get('/list')
  findAll(@Query('school_id', ValidationPipe) school: string): Promise<News[]> {
    return this.newsService.findAll(school);
  }

  @Patch()
  @UsePipes(ValidationPipe)
  update(@Body() updateNewsDto: UpdateNewsDto): Promise<News> {
    return this.newsService.update(updateNewsDto);
  }
}
