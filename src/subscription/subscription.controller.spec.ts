import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { NewsService } from '../school/news/news.service';

describe('SubscriptionController', () => {
  let controller: SubscriptionController;
  // Services
  let subscriptionService: SubscriptionService;
  let newsService: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionController],
      providers: [NewsService, SubscriptionService],
    }).compile();

    controller = module.get<SubscriptionController>(SubscriptionController);

    subscriptionService = module.get<SubscriptionService>(SubscriptionService);
    newsService = module.get<NewsService>(NewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
