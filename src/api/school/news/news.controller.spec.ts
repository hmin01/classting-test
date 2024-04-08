import { Test, TestingModule } from '@nestjs/testing';
// Controller
import { NewsController } from './news.controller';
// Repository
import { NewsRepository } from '@repository/news.repository';
// Service
import { NewsService } from './news.service';

describe('NewsController', () => {
  let controller: NewsController;

  beforeEach(async () => {
    const mockRepository = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [NewsService, { provide: NewsRepository, useValue: mockRepository }],
    }).compile();

    controller = module.get<NewsController>(NewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
