import { Module } from '@nestjs/common';
// Controller
import { SubscriptionController } from './subscription.controller';
// Service
import { NewsService } from 'src/school/news/news.service';
import { SubscriptionService } from './subscription.service';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, NewsService],
})
export class SubscriptionModule {}
