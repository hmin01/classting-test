import { Test, TestingModule } from '@nestjs/testing';
// Controller
import { SchoolController } from './school.controller';
// Repository
import { SchoolRepository } from '@repository/school.repository';
import { SubscriptionRepository } from '@repository/subscription.repository';
// Service
import { SchoolService } from './school.service';
import { SubscriptionService } from '@api/subscription/subscription.service';
import { NewsRepository } from '@repository/news.repository';

describe('SchoolController', () => {
  let controller: SchoolController;
  // Services
  let schoolService: SchoolService;
  let subscriptionService: SubscriptionService;

  beforeEach(async () => {
    const mockRepository = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolController],
      providers: [SchoolService, SubscriptionService, { provide: SchoolRepository, useValue: mockRepository }, { provide: SubscriptionRepository, useValue: mockRepository }, { provide: NewsRepository, useValue: mockRepository }],
    }).compile();

    controller = module.get<SchoolController>(SchoolController);

    schoolService = module.get<SchoolService>(SchoolService);
    subscriptionService = module.get<SubscriptionService>(SubscriptionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
