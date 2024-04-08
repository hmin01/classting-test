import { Test, TestingModule } from '@nestjs/testing';
// Module
import { RootTestModule } from 'src/test/root-test.module';
// Repository
import { SchoolRepository } from '@repository/school.repository';
// Service
import { SchoolService } from './school.service';

describe('SchoolService', () => {
  let service: SchoolService;
  let repository: SchoolRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RootTestModule],
      providers: [SchoolRepository, SchoolService],
    }).compile();

    service = module.get<SchoolService>(SchoolService);
    repository = module.get<SchoolRepository>(SchoolRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
