import { Test, TestingModule } from '@nestjs/testing';
// DTO
import type { CreateNewsDto, UpdateNewsDto } from '@/dto/news.dto';
// Interface
import type { News } from '@/interface/news.interface';
// Repository
import { NewsRepository } from '@repository/news.repository';
import { MockNewsRepository } from '@repository/news.repository.test';
// Service
import { NewsService } from './news.service';

describe('NewsService', () => {
  let service: NewsService;
  let repository: NewsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsService, { provide: NewsRepository, useClass: MockNewsRepository }],
    }).compile();

    service = module.get<NewsService>(NewsService);
    repository = module.get<NewsRepository>(NewsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('학교 소식에 대한 CRUD', () => {
    const news: News = {
      school: '9d094e86f297c0ef78392b19234b1786',
      createdAt: 1712237123271,
      content: 'hello, world',
    };

    it('소식 생성', async () => {
      // 생성을 위한 DTO
      const input: CreateNewsDto = { school_id: news.school, content: news.content };
      // 프로세스
      const result = await service.create(input);
      // 테스트
      expect(result).toHaveProperty('createdAt');
    });

    it('특정 소식 조회', async () => {
      // Spyon
      jest.spyOn(repository, 'findOne').mockResolvedValue(news);

      // 프로세스
      const result = await service.findOne(news.school, news.createdAt);
      // 테스트
      expect(result).toMatchObject({ school: news.school, content: news.content, createdAt: news.createdAt });
    });

    it('소식 수정', async () => {
      // Spyon
      jest.spyOn(repository, 'findOne').mockResolvedValue(news);

      // 업데이트 내용
      const updatedContent = 'updatedContent';
      // 업데이트를 위한 객체
      const updateNewsDto: UpdateNewsDto = { created_at: news.createdAt, school_id: news.school, content: updatedContent };
      // 프로세스
      const result = await service.update(updateNewsDto);
      // 테스트
      expect(result).toHaveProperty('editedAt');
      expect(result).toMatchObject({ school: news.school, createdAt: news.createdAt, content: updatedContent });
    });
  });
});
