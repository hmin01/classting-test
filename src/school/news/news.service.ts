import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
// DTO
import { CreateNewsDto, UpdateNewsDto } from './news.dto';
// Interface
import { News, NewsKey } from './news.schema';
// Utility
import { responseException, responseNotFound } from 'utils/response';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel('classting-news') private newsModel: Model<News, NewsKey>,
  ) {}

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    // 생성 시각 (Timestamp)
    const createdAt = Date.now();
    // 데이터 저장을 위한 객체 생성
    const info: News = {
      school: createNewsDto.school_id,
      content: createNewsDto.content,
      createdAt,
    };

    try {
      return await this.newsModel.create(info);
    } catch (err) {
      responseException(err);
    }
  }

  async remove(school: string, createdAt: number): Promise<string> {
    try {
      // 삭제
      await this.newsModel.delete({ school, createdAt });
      // 삭제 완료 메시지 반환
      return 'deleted';
    } catch (err) {
      responseException(err);
    }
  }

  async findOneById(school: string, createdAt: number): Promise<News> {
    try {
      // ID을 이용한 조회
      const result = await this.newsModel.get({ school, createdAt });
      // 예외 처리
      if (result === undefined || result === null) {
        responseNotFound('news');
      } else {
        return result;
      }
    } catch (err) {
      responseException(err);
    }
  }

  async findAll(school: string): Promise<News[]> {
    try {
      return await this.newsModel.query('school').eq(school).exec();
    } catch (err) {
      responseException(err);
    }
  }

  async update(updateNewsDto: UpdateNewsDto): Promise<News> {
    // 수정 시각 (Timestamp)
    const editedAt = Date.now();
    // 업데이트를 위한 객체 생성
    const key: NewsKey = {
      school: updateNewsDto.school_id,
      createdAt: updateNewsDto.created_at,
    };
    const updated = {
      content: updateNewsDto.content,
      editedAt,
    };

    try {
      // 데이터 조회
      const result = await this.newsModel
        .query('school')
        .eq(updateNewsDto.school_id)
        .where('createdAt')
        .eq(updateNewsDto.created_at)
        .count()
        .exec();
      // 일치하는 값이 없을 경우, 예외 처리
      if (result.count === 0) {
        responseNotFound('news');
      } else {
        // 업데이트
        return await this.newsModel.update(key, updated);
      }
    } catch (err) {
      responseException(err);
    }
  }
}
