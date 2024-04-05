import { Test, TestingModule } from '@nestjs/testing';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { createHash } from '../utils/crypto';

describe('SchoolController', () => {
  let controller: SchoolController;
  // Services
  let schoolService: SchoolService;
  let subscriptionService: SubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolController],
      providers: [SchoolService, SubscriptionService],
    }).compile();

    controller = module.get<SchoolController>(SchoolController);

    schoolService = module.get<SchoolService>(SchoolService);
    subscriptionService = module.get<SubscriptionService>(SubscriptionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new school', async () => {
    // 입력 Mock 데이터
    const input = { region: 'seoul', name: 'middle_school' };
    // 결과 Mock 데이터
    const created = createHash(input.region, input.name);

    // 서비스 메서드 결과 값 설정
    jest.spyOn(schoolService, 'create').mockResolvedValueOnce(created);

    // 동작 확인
    expect(await controller.create(input)).toBe(created);
  });
});
