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
// Swagger
import {
  ApiBadGatewayResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('News API')
@ApiBadGatewayResponse({ description: '요청 오류' })
@ApiInternalServerErrorResponse({ description: '서버 내부 동작 오류' })
@Controller('school/news')
export class NewsController {
  constructor(private newsService: NewsService) {}
  @Post('/item')
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: '소식 생성',
    description: '학교 페이지 내 소식을 작성합니다.',
  })
  create(@Body() createNewsDto: CreateNewsDto): Promise<News> {
    return this.newsService.create(createNewsDto);
  }

  @Get('/item')
  @ApiOperation({
    summary: '소식 조회',
    description: '작성된 특정 소식을 조회합니다.',
  })
  @ApiNotFoundResponse({ description: '소식 정보 없음' })
  findOneById(
    @Query('school_id', ValidationPipe) school: string,
    @Query('created_at', ParseIntPipe) createdAt: number,
  ): Promise<News> {
    return this.newsService.findOne(school, createdAt);
  }

  @Delete('/item')
  @ApiOperation({
    summary: '소식 삭제',
    description: '작성된 특정 소식을 삭제합니다.',
  })
  remove(
    @Query('school_id', ValidationPipe) school: string,
    @Query('created_at', ValidationPipe) createdAt: number,
  ): Promise<string> {
    return this.newsService.remove(school, createdAt);
  }

  @Patch('/item')
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: '소식 수정',
    description: '작성된 특정 소식을 수정합니다.',
  })
  @ApiNotFoundResponse({ description: '소식 정보 없음' })
  update(@Body() updateNewsDto: UpdateNewsDto): Promise<News> {
    return this.newsService.update(updateNewsDto);
  }
}
