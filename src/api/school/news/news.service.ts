import { Injectable } from '@nestjs/common';
// DTO
import { CreateNewsDto, UpdateNewsDto } from '@/dto/news.dto';
// Interface
import type { News, NewsKey } from '@/interface/news.interface';
// Repository
import { NewsRepository } from '@repository/news.repository';
// Utility
import { responseException, responseNotFound } from '@util/response';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

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
      return await this.newsRepository.create(info);
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
      // Key
      const key = this.createKey(school, createdAt);

      // ID을 이용한 조회
      const result = await this.newsRepository.findOne(key);
      // 예외 처리
      if (result === undefined || result === null) {
        responseNotFound();
      }

      // 결과 반환
      return result;
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
  async findAllByRange(school: string, startAt: number, endAt?: number): Promise<News[]> {
    try {
      // 기간 객체
      const range = { start: startAt, endAt: endAt };
      // 공통 쿼리
      const result = await this.newsRepository.findAllByRange(school, range);

      // 최신 순으로 정렬 및 반환
      return result.sort((a: News, b: News): number => b.createdAt - a.createdAt);
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
      // Key
      const key = this.createKey(school, createdAt);
      // 삭제 쿼리
      await this.newsRepository.remove(key);

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
      // Key
      const key = this.createKey(updateNewsDto.school_id, updateNewsDto.created_at);
      // 업데이트를 위한 객체 생성
      const updated = {
        content: updateNewsDto.content,
        editedAt: Date.now(),
      };

      // 데이터 조회
      const result = await this.newsRepository.findOne(key);
      // 예외 처리
      if (result === undefined || result === null) {
        responseNotFound();
      }

      // 업데이트
      return await this.newsRepository.update(key, updated);
    } catch (err) {
      responseException(err);
    }
  }

  /**
   * [Method] 데이터 키 생성 함수
   * @param school 학교ID
   * @param createdAt 생성 시간 (Timestamp)
   * @returns 키(Key) 객체
   */
  createKey(school: string, createdAt: number): NewsKey {
    return { school, createdAt };
  }
}
