import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
// Interface
import type { NewsRange, News, NewsKey, NewsContent } from '@/interface/news.interface';
// Schema
import { NewsSchemaName } from '@/schema/news.schema';

@Injectable()
export class NewsRepository {
  constructor(@InjectModel(NewsSchemaName) private readonly model: Model<News, NewsKey>) {}

  async create(input: News): Promise<News> {
    return await this.model.create(input);
  }

  async findOne(key: NewsKey): Promise<News> {
    return await this.model.get(key);
  }

  async findAllByRange(school: string, range: NewsRange): Promise<News[]> {
    // 공통 쿼리
    const query = this.model.query('school').eq(school).where('createdAt');

    // 구독 취소 경우와 이닌 경우에 따라 조건 쿼리 실행
    if (range.end > 0) {
      return await query.between(range.start, range.end).exec();
    } else {
      return await query.ge(range.start).exec();
    }
  }

  async remove(key: NewsKey): Promise<void> {
    return this.model.delete(key);
  }

  async update(key: NewsKey, updated: NewsContent): Promise<News> {
    return this.model.update(key, updated);
  }
}
