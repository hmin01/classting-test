import { Controller, Get, ParseBoolPipe, Query, Req } from '@nestjs/common';
// Interface
import { Subscribe } from './subscribe.schema';
// Service
import { NewsService } from 'src/school/news/news.service';
import { SubscribeService } from './subscribe.service';
// Swagger
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Subscription API')
@ApiUnauthorizedResponse({ description: '권한 없음' })
@ApiInternalServerErrorResponse({ description: '서버 내부 동작 오류' })
@Controller('subscribe')
export class SubscribeController {
  constructor(
    private readonly subscribeService: SubscribeService,
    private readonly newsService: NewsService,
  ) {}

  @Get('/list')
  @ApiOperation({
    summary: '구독 중인 학교 목록 조회',
    description: '구독 중인 학교 페이지 목록을 조회합니다.',
  })
  @ApiOkResponse({ description: '조회 완료' })
  async findAll(@Req() req: any): Promise<Subscribe[]> {
    return this.subscribeService.findAll(req.user);
  }

  @Get('/news')
  @ApiOperation({
    summary: '구독 중인 학교 소식 조회',
    description:
      '구독 중인 학교 페이지의 소식을 조회합니다. 기본적으로 구독 중인 모든 학교의 소식을 모아서 반환하며, 쿼리 파라미터 옵션을 통해 특정 학교 ID를 전달 받으면 구독 여부와 기간을 조건으로 해당 학교의 소식만을 반환 받을 수도 있습니다.',
  })
  @ApiQuery({ name: 'school_id', required: false })
  @ApiOkResponse({ description: '조회 완료' })
  async findAllBySchool(@Query('school_id') school: string, @Req() req: any) {
    // 특정 학교에 대한 소식만 조회
    if (school) {
      // 학교 구독 기간 조회
      const subscription = await this.subscribeService.findOne(
        req.user,
        school,
      );
      // 조건에 부합하는 소식 조회 및 반환
      return await this.newsService.findAllByRange(
        subscription.school,
        subscription.subscribedAt,
        subscription.unsubscribedAt,
      );
    }
    // 구독 중인 모든 학교에 대한 소식 조회
    else {
      const subscriptions = await this.subscribeService.findAll(req.user);
      const result = [];
      for (let i = 0; i < subscriptions.length; i++) {
        const { school, subscribedAt, unsubscribedAt } = subscriptions[i];
        result.push(
          ...(await this.newsService.findAllByRange(
            school,
            subscribedAt,
            unsubscribedAt,
          )),
        );
      }
      return result.sort((a: any, b: any) => a.createdAt - b.createdAt);
    }
  }
}
