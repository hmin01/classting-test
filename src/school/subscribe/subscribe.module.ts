import { Module } from '@nestjs/common';
// Controller
import { SubscribeController } from './subscribe.controller';

// Module
import { DynamooseModule } from 'nestjs-dynamoose';
// Schema
import { SubscribeSchema } from './subscribe.schema';
// Service
import { SubscribeService } from './subscribe.service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'classting-subscribe',
        schema: SubscribeSchema,
      },
    ]),
  ],
  controllers: [SubscribeController],
  providers: [SubscribeService],
})
export class SubscribeModule {}
