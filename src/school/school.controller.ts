import {
  Body,
  Controller,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// DTO
import { CreateSchoolDto } from './school.dto';
import { SubscribeDto } from '../subscribe/subscribe.dto';
// HTTP Method
import { Patch, Post, Put } from '@nestjs/common';
// Interface
import { Subscribe } from '../subscribe/subscribe.schema';
// Service
import { SchoolService } from './school.service';
import { SubscribeService } from 'src/subscribe/subscribe.service';

@Controller('school')
export class SchoolController {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly subscribeService: SubscribeService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createSchoolDto: CreateSchoolDto): Promise<string> {
    return this.schoolService.create(createSchoolDto);
  }

  @Put('/subscribe')
  @UsePipes(ValidationPipe)
  async subscribe(
    @Body() subscribeDto: SubscribeDto,
    @Req() req: any,
  ): Promise<Subscribe> {
    return this.subscribeService.subscribe(req.user, subscribeDto.school_id);
  }

  @Patch('/unsubscribe')
  @UsePipes(ValidationPipe)
  async unsubscribe(
    @Body() subscribeDto: SubscribeDto,
    @Req() req: any,
  ): Promise<Subscribe> {
    return this.subscribeService.unsubscribe(req.user, subscribeDto.school_id);
  }
}
