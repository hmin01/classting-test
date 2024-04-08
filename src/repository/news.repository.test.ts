// Interface
import type { News, NewsContent, NewsKey } from '@/interface/news.interface';
// Util
import { responseNotFound } from '@util/response';

export class MockNewsRepository {
  private data: any = {
    '5dfe888cf504d49b1b5b8b375945aac3': [],
    '9d094e86f297c0ef78392b19234b1786': [
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
    ],
    f6b47d78f795d90728d40a2e6dfc3fa0: [
      {
        content: 'middle school news 001',
        createdAt: 1712322022656,
        school: 'f6b47d78f795d90728d40a2e6dfc3fa0',
      },
      {
        content: 'middle school news 002',
        createdAt: 1712322031287,
        school: 'f6b47d78f795d90728d40a2e6dfc3fa0',
      },
      {
        content: '뉴스 피드 1',
        createdAt: 1712322201838,
        school: 'f6b47d78f795d90728d40a2e6dfc3fa0',
      },
    ],
  };

  create(input: News): News {
    return input;
  }

  findOne(school: string, createdAt: number): News {
    if (this.data[school]) {
      return this.data[school].find((elem: any): boolean => elem.createdAt === createdAt);
    }

    responseNotFound();
  }

  findAllByRange(school: string) {
    return this.data[school];
  }

  remove(): void {
    return;
  }

  update(key: NewsKey, updated: NewsContent): News {
    return { ...key, ...updated };
  }
}
