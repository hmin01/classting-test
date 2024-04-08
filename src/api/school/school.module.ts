import { Module } from '@nestjs/common';
// Controller
import { SchoolController } from './school.controller';
// Module
import { DynamooseModule } from 'nestjs-dynamoose';
import { NewsModule } from './news/news.module';
// Repository
import { SchoolRepository } from '@repository/school.repository';
import { SubscriptionRepository } from '@repository/subscription.repository';
// Schema
import SchoolSchema, { SchoolSchemaName } from '@/schema/school.schema';
import SubscriptionSchema, { SubscriptionSchemaName } from '@/schema/subscription.schema';
// Service
import { SchoolService } from './school.service';
import { SubscriptionService } from '@api/subscription/subscription.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      { name: SchoolSchemaName, schema: SchoolSchema },
      { name: SubscriptionSchemaName, schema: SubscriptionSchema },
    ]),
    NewsModule,
  ],
  controllers: [SchoolController],
  providers: [SchoolRepository, SchoolService, SubscriptionRepository, SubscriptionService],
})
export class SchoolModule {}
