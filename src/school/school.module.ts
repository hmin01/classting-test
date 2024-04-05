import { Module } from '@nestjs/common';
// Controller
import { SchoolController } from './school.controller';
// Module
import { NewsModule } from './news/news.module';
// Service
import { SchoolService } from './school.service';
import { SubscriptionService } from '../subscription/subscription.service';

@Module({
  imports: [NewsModule],
  controllers: [SchoolController],
  providers: [SchoolService, SubscriptionService],
})
export class SchoolModule {}
