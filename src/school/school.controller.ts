import {
  Body,
  Controller,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// DTO
import { CreateSchoolDto } from './school.dto';
import { SubscribeDto } from '../subscription/subscription.dto';
// HTTP Method
import { Patch, Post, Put } from '@nestjs/common';
// Service
import { SchoolService } from './school.service';
import { SubscriptionService } from '../subscription/subscription.service';
// Swagger
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('School API')
@ApiBadRequestResponse({ description: '요청 오류' })
@ApiInternalServerErrorResponse({ description: '서버 내부 동작 오류' })
@Controller('school')
export class SchoolController {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: '학교 페이지 생성',
    description: '지역과 학교명을 이용하여 학교 페이지를 생성합니다.',
  })
  @ApiCreatedResponse({ description: '생성 완료' })
  create(@Body() createSchoolDto: CreateSchoolDto): Promise<string> {
    return this.schoolService.create(createSchoolDto);
  }

  @Put('/subscription')
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '학교 페이지 구독',
    description: '학교 페이지를 구독합니다.',
  })
  @ApiOkResponse({ description: '구독 완료' })
  @ApiUnauthorizedResponse({ description: '권한 없음' })
  async subscribe(
    @Body() subscribeDto: SubscribeDto,
    @Req() req: any,
  ): Promise<Date> {
    return this.subscriptionService.subscribe(req.user, subscribeDto.school_id);
  }

  @Patch('/unsubscription')
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '학교 페이지 구독 취소',
    description: '구독 중인 학교 페이지를 취소합니다.',
  })
  @ApiOkResponse({ description: '구독 취소 완료' })
  @ApiNotFoundResponse({ description: '구독 정보 없음' })
  @ApiUnauthorizedResponse({ description: '권한 없음' })
  async unsubscribe(
    @Body() subscribeDto: SubscribeDto,
    @Req() req: any,
  ): Promise<Date> {
    return this.subscriptionService.unsubscribe(
      req.user,
      subscribeDto.school_id,
    );
  }
}
