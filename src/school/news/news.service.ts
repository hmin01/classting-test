import { Injectable } from '@nestjs/common';
// DTO
import { CreateNewsDto, UpdateNewsDto } from './news.dto';
// Model
import NewsModel from './news.model';
// Interface
import { News } from './news.interface';
// Utility
import { responseException, responseNotFound } from '../../utils/response';

@Injectable()
export class NewsService {
  /**
   * [Method] 학교 소식 생성 메서드
   * @param createNewsDto 생성을 위한 데이터 객체
   * @returns 저장된 데이터 객체
   */
  async create(createNewsDto: CreateNewsDto): Promise<News> {
    try {
      // 데이터 저장을 위한 객체 생성
      const info = {
        school: createNewsDto.school_id,
        content: createNewsDto.content,
        createdAt: Date.now(),
      };
      // 데이터 저장
      return await NewsModel.create(info);
    } catch (err) {
      responseException(err);
    }
  }

  /**
   * [Method] 특정 학교 소식 조회 메서드
   * @param school 학교 ID
   * @param createdAt 생성 시간 (Timestamp)
   * @returns 조건에 부합하는 소식 목록
   */
  async findOne(school: string, createdAt: number): Promise<News> {
    try {
      // ID을 이용한 조회
      const result = await NewsModel.get({ school, createdAt });
      // 예외 처리
      if (result === undefined || result === null) {
        responseNotFound();
      } else {
        return result;
      }
    } catch (err) {
      responseException(err);
    }
  }

  /**
   * [Method] 특정 기간 동안 특정 학교 소식 조회 메서드
   * @param school 학교 ID
   * @param startAt 시작 시간 (Timestamp)
   * @param endAt 종료 시간 (Timestamp)
   * @returns 조건에 부합하는 소식 목록
   */
  async findAllByRange(
    school: string,
    startAt: number,
    endAt?: number,
  ): Promise<News[]> {
    try {
      // 공통 쿼리
      const query = NewsModel.query('school').eq(school).where('createdAt');

      // 구독 취소 경우와 이닌 경우에 따라 조건 쿼리 실행
      let result: News[];
      if (endAt > 0) {
        result = await query.between(startAt, endAt).exec();
      } else {
        result = await query.ge(startAt).exec();
      }
      // 최신 순으로 정리
      return await this.arrangeNews(result, 'desc');
    } catch (err) {
      responseException(err);
    }
  }

  /**
   * [Method] 학교 소식 삭제 메서드
   * @param school 학교 ID
   * @param createdAt 생성 시간 (Timestamp)
   * @returns 요청 처리 완료 메시지
   */
  async remove(school: string, createdAt: number): Promise<string> {
    try {
      // 삭제
      await NewsModel.delete({ school, createdAt });
      // 삭제 완료 메시지 반환
      return 'deleted';
    } catch (err) {
      responseException(err);
    }
  }

  /**
   * [Method] 학교 소식 수정 메서드
   * @param updateNewsDto 수정을 위한 데이터 객체
   * @returns 수정된 데이터 객체
   */
  async update(updateNewsDto: UpdateNewsDto): Promise<News> {
    try {
      // 업데이트를 위한 객체 생성
      const key = {
        school: updateNewsDto.school_id,
        createdAt: updateNewsDto.created_at,
      };
      const updated = {
        content: updateNewsDto.content,
        editedAt: Date.now(),
      };

      // 데이터 조회
      const result = await NewsModel.query('school')
        .eq(updateNewsDto.school_id)
        .where('createdAt')
        .eq(updateNewsDto.created_at)
        .count()
        .exec();
      // 일치하는 값이 없을 경우, 예외 처리
      if (result.count === 0) {
        responseNotFound();
      } else {
        // 업데이트
        return await NewsModel.update(key, updated);
      }
    } catch (err) {
      responseException(err);
    }
  }

  /**
   * [Method] 데이터 정렬 메서드
   * @param arr 정렬하고자 하는 소식 데이터 배열
   * @param sortType 정렬 유형 ['asc' | 'desc']
   * @returns 정렬된 데이터 배열
   */
  async arrangeNews(arr: News[], sortType?: 'asc' | 'desc'): Promise<News[]> {
    return arr.sort((a: News, b: News): number => {
      if (sortType === 'desc') {
        return b.createdAt - a.createdAt;
      } else {
        return a.createdAt - b.createdAt;
      }
    });
  }
}
