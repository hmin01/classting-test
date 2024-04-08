// Interface
import type { SubscriptionRange } from '@/interface/subscription.interface';
import type { Subscription, SubscriptionKey } from '@/interface/subscription.interface';

export class MockSubscriptionRepository {
  create(input: Subscription): Subscription {
    return input;
  }

  findOne(key: SubscriptionKey): Subscription {
    return { ...key, subscribedAt: 1712321602246, unsubscribedAt: 1712322123574 };
  }

  findAllByUser(user: string): any[] {
    return [
      {
        unsubscribedAt: 0,
        school: '5dfe888cf504d49b1b5b8b375945aac3',
        subscribedAt: 1712552472827,
      },
      {
        unsubscribedAt: 1712322123574,
        school: '9d094e86f297c0ef78392b19234b1786',
        subscribedAt: 1712321602246,
      },
      {
        unsubscribedAt: 0,
        school: 'f6b47d78f795d90728d40a2e6dfc3fa0',
        subscribedAt: 1712321977008,
      },
    ];
  }

  findSubscribingByUser(user: string): any[] {
    return [
      {
        school: '5dfe888cf504d49b1b5b8b375945aac3',
        subscribedAt: 1712552472827,
      },
      {
        school: 'f6b47d78f795d90728d40a2e6dfc3fa0',
        subscribedAt: 1712321977008,
      },
    ];
  }

  update(key: SubscriptionKey, updated: SubscriptionRange): Subscription {
    return { ...key, ...updated };
  }
}
