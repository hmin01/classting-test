import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
// Const
import { SubscriptionSchemaName } from '@/schema/subscription.schema';
// Interface
import type { SubscriptionRange } from '@/interface/subscription.interface';
import type { Subscription, SubscriptionKey } from '@/interface/subscription.interface';

@Injectable()
export class SubscriptionRepository {
  constructor(
    @InjectModel(SubscriptionSchemaName)
    private readonly model: Model<Subscription, SubscriptionKey>,
  ) {}

  async create(input: Subscription): Promise<Subscription> {
    return await this.model.create(input);
  }

  async findOne(key: SubscriptionKey): Promise<Subscription> {
    return await this.model.get(key);
  }

  async findAllByUser(user: string): Promise<Subscription[]> {
    return await this.model.query('user').eq(user).attributes(['school', 'subscribedAt', 'unsubscribedAt']).exec();
  }

  async findSubscribingByUser(user: string): Promise<Subscription[]> {
    return await this.model.query('user').eq(user).where('unsubscribedAt').eq(0).attributes(['school', 'subscribedAt']).exec();
  }

  async update(key: SubscriptionKey, updated: SubscriptionRange): Promise<Subscription> {
    return this.model.update(key, updated);
  }
}
