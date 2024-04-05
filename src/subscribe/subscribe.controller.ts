import { Controller, Get, Req } from '@nestjs/common';
// Interface
import { Subscribe } from './subscribe.schema';
// Service
import { NewsService } from 'src/school/news/news.service';
import { SubscribeService } from './subscribe.service';

@Controller('subscribe')
export class SubscribeController {
  constructor(
    private readonly subscribeService: SubscribeService,
    private readonly newsService: NewsService,
  ) {}

  @Get('/list')
  async findAll(@Req() req: any): Promise<Subscribe[]> {
    return this.subscribeService.findAll(req.user);
  }

  @Get('/news')
  async findAllBySchool(@Req() req: any) {
    const subscriptions = await this.subscribeService.findAllBySchool(req.user);

    const result = {};
    for (let i = 0; i < subscriptions.length; i++) {
      const { school, subscribedAt, unsubscribedAt } = subscriptions[i];
      result[school] = await this.newsService.findAll(
        school,
        subscribedAt,
        unsubscribedAt,
      );
    }
    return result;
  }
}
