import { Module } from '@nestjs/common';
// Controller
import { SchoolController } from './school.controller';
// Module
import { NewsModule } from './news/news.module';
// Model
import SchoolModel from './school.model';
import SubscriptionModel from '../subscription/subscription.model';
// Service
import { SchoolService } from './school.service';
import { SubscriptionService } from '../subscription/subscription.service';

@Module({
  imports: [NewsModule],
  controllers: [SchoolController],
  providers: [
    SchoolService,
    SubscriptionService,
    SchoolModel,
    SubscriptionModel,
  ],
})
export class SchoolModule {}
