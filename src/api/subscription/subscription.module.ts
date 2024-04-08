import { Module } from '@nestjs/common';
// Controller
import { SubscriptionController } from './subscription.controller';
// Module
import { DynamooseModule } from 'nestjs-dynamoose';
// Repository
import { NewsRepository } from '@repository/news.repository';
import { SubscriptionRepository } from '@repository/subscription.repository';
// Schema
import NewsSchema, { NewsSchemaName } from '@/schema/news.schema';
import SubscriptionSchema, { SubscriptionSchemaName } from '@/schema/subscription.schema';
// Service
import { NewsService } from '@api/school/news/news.service';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      { name: NewsSchemaName, schema: NewsSchema },
      { name: SubscriptionSchemaName, schema: SubscriptionSchema },
    ]),
  ],
  controllers: [SubscriptionController],
  providers: [NewsRepository, NewsService, SubscriptionRepository, SubscriptionService],
  exports: [SubscriptionRepository],
})
export class SubscriptionModule {}
