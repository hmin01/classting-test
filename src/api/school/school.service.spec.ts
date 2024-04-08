import { Test, TestingModule } from '@nestjs/testing';
// DTO
import type { CreateSchoolDto } from '@/dto/school.dto';
// Interface
import type { School } from '@/interface/school.interface';
// Repository
import { SchoolRepository } from '@repository/school.repository';
// Service
import { SchoolService } from './school.service';
// Util
import { createHash } from '@util/crypto';

describe('SchoolService', () => {
  let service: SchoolService;
  // 입력 데이터
  const input = { region: 'gimhae', name: 'gaya' };
  // 입력 값 기반 UUID
  let uuid: string;

  beforeEach(async () => {
    // UUID 생성
    uuid = createHash(input.region, input.name);
    // Mock 레포 정의
    const mockRepository = {
      create: jest.fn().mockResolvedValue({ ...input, uuid } as School),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolService, { provide: SchoolRepository, useValue: mockRepository }],
    }).compile();

    service = module.get<SchoolService>(SchoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be created', async () => {
    // 메인 프로세스
    const result = await service.create(input);
    // 테스트
    expect(result).toBe(uuid);
  });
});
