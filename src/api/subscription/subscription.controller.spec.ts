import { Test, TestingModule } from '@nestjs/testing';
// Controller
import { SubscriptionController } from './subscription.controller';
// Service
import { SubscriptionService } from './subscription.service';
import { NewsService } from '@api/school/news/news.service';
// Repository
import { NewsRepository } from '@repository/news.repository';
import { SubscriptionRepository } from '@repository/subscription.repository';

describe('SubscriptionController', () => {
  let controller: SubscriptionController;

  beforeEach(async () => {
    const mockRepository = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionController],
      providers: [NewsService, SubscriptionService, { provide: NewsRepository, useValue: mockRepository }, { provide: SubscriptionRepository, useValue: mockRepository }],
    }).compile();

    controller = module.get<SubscriptionController>(SubscriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
