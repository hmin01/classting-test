import { Test, TestingModule } from '@nestjs/testing';
// Service
import { SubscriptionService } from './subscription.service';
// Repository
import { NewsRepository } from '@repository/news.repository';
import { MockNewsRepository } from '@repository/news.repository.test';
import { MockSubscriptionRepository } from '@repository/subscription.repository.test';
import { SubscriptionRepository } from '@repository/subscription.repository';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  // Repo
  let newsRepository: NewsRepository;
  let subscriptionRepository: SubscriptionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionService, { provide: NewsRepository, useClass: MockNewsRepository }, { provide: SubscriptionRepository, useClass: MockSubscriptionRepository }],
    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
    // Repo
    newsRepository = module.get<NewsRepository>(NewsRepository);
    subscriptionRepository = module.get<SubscriptionRepository>(SubscriptionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('구독 중인 학교 소식에 대한 테스트', () => {
    const user = 'test001';

    it('구독 중인 특정 학교의 소식 조회', async () => {
      // 학교 ID
      const school: string = '9d094e86f297c0ef78392b19234b1786';
      // 프로세스
      const result = await service.getNews(user, school);
      // 테스트
      expect(result).toMatchObject([
        {
          content: 'hello, world',
          createdAt: 1712321920963,
          school: '9d094e86f297c0ef78392b19234b1786',
        },
        {
          content: 'hi~',
          createdAt: 1712322041526,
          school: '9d094e86f297c0ef78392b19234b1786',
        },
      ]);
    });

    it('구독 중 또는 구독하였던 학교의 모든 소식 조회', async () => {
      // 프로세스
      const result = await service.getNews(user);
      // 테스트
      expect(result).toMatchObject([
        {
          content: '뉴스 피드 1',
          createdAt: 1712322201838,
          school: 'f6b47d78f795d90728d40a2e6dfc3fa0',
        },
        {
          content: 'hi~',
          createdAt: 1712322041526,
          school: '9d094e86f297c0ef78392b19234b1786',
        },
        {
          content: 'middle school news 002',
          createdAt: 1712322031287,
          school: 'f6b47d78f795d90728d40a2e6dfc3fa0',
        },
        {
          content: 'middle school news 001',
          createdAt: 1712322022656,
          school: 'f6b47d78f795d90728d40a2e6dfc3fa0',
        },
        {
          content: 'hello, world',
          createdAt: 1712321920963,
          school: '9d094e86f297c0ef78392b19234b1786',
        },
      ]);
    });
  });
});
