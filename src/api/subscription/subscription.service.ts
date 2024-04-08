import { Injectable } from '@nestjs/common';
// Interface
import type { Subscription, SubscriptionKey } from '@/interface/subscription.interface';
// Repository
import { NewsRepository } from '@repository/news.repository';
import { SubscriptionRepository } from '@repository/subscription.repository';
// Utility
import { responseBadRequest, responseException, responseNotFound } from '@util/response';
import { News } from '@/interface/news.interface';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly newsRepository: NewsRepository,
  ) {}

  /**
   * [Method] 구독 중인 학교 목록 조회 메서드
   * @param user 사용자 ID
   * @returns 조건에 부합하는 구독 데이터
   */
  async getList(user: string): Promise<Subscription[]> {
    try {
      // 데이터 조회
      const result = await this.subscriptionRepository.findSubscribingByUser(user);
      // 데이터 가공 및 반환
      return result.map((elem: Subscription): any => ({
        school: elem.school,
        subscribedAt: new Date(elem.subscribedAt),
      }));
    } catch (err) {
      responseException(err);
    }
  }

  /**
   * [Method] 특정 구독 정보 조회 메서드
   * @param user 사용자 ID
   * @param school 학교 ID
   * @returns 조건에 부합하는 구독 데이터
   */
  async findOne(user: string, school: string): Promise<Subscription> {
    try {
      // Key
      const key = this.createKey(user, school);

      // 구독 존재 여부 확인
      const subscription = await this.subscriptionRepository.findOne(key);
      // 예외 처리
      if (subscription === undefined || subscription === null) {
        responseNotFound();
      }
      // 구독 정보 반환
      return subscription;
    } catch (err) {
      responseException(err);
    }
  }

  /**
   * [Method] 구독 중 또는 구독했던 모든 학교 목록 조회 메서드
   * @param user 사용자 ID
   * @returns 조건에 부합하는 구독 데이터
   */
  async findAll(user: string): Promise<Subscription[]> {
    try {
      return await this.subscriptionRepository.findAllByUser(user);
    } catch (err) {
      responseException(err);
    }
  }

  /**
   * [Method] 구독 중인 학교에 대한 소식 조회 메서드
   * @param user 사용자 ID
   * @param school 학교 ID
   * @returns 조건에 부합하는 소식 목록
   */
  async getNews(user: string, school?: string) {
    // 특정 학교에 대한 소식 조회
    if (school) {
      // Key
      const key = this.createKey(user, school);

      // 데이터 조회
      const subscription = await this.subscriptionRepository.findOne({ user, school });
      // 예외 처리
      if (subscription === undefined || subscription === null) {
        responseNotFound();
      }

      // 기간 객체
      const range = { start: subscription.subscribedAt, end: subscription.unsubscribedAt };
      // 데이터 조회
      return this.newsRepository.findAllByRange(school, range);
    }
    // 구독 중인 모든 학교에 대한 소식
    const subscriptions = await this.subscriptionRepository.findAllByUser(user);

    const combined = [];
    for (let i = 0; i < subscriptions.length; i++) {
      // 속성 추출
      const { school, subscribedAt, unsubscribedAt } = subscriptions[i];

      // 기간 객체
      const range = { start: subscribedAt, end: unsubscribedAt };
      // 데이터 조회
      const result = await this.newsRepository.findAllByRange(school, range);

      // 결과 병합
      combined.push(...result);
    }

    // 최신 순으로 정렬 및 반환
    return combined.sort((a: News, b: News): number => b.createdAt - a.createdAt);
  }

  /**
   * [Method] 학교 페이지 구독 메서드
   * @param user 사용자 ID
   * @param school 학교 ID
   * @returns 구독한 시간
   */
  async subscribe(user: string, school: string): Promise<Date> {
    try {
      // Key
      const key = this.createKey(user, school);
      // 갱신 데이터
      const updated = {
        subscribedAt: Date.now(),
        unsubscribedAt: 0,
      };

      // 구독 존재 여부 확인
      const subscription = await this.subscriptionRepository.findOne(key);
      // 예외 처리
      if (subscription && subscription.unsubscribedAt === 0) {
        responseBadRequest('Already been subscribed.');
      }

      // 기존 데이터가 존재하면 갱신, 없을 경우 생성하기 위해 update() 메서드 사용
      await this.subscriptionRepository.update(key, updated);
      // 구독 시간 반환
      return new Date(updated.subscribedAt);
    } catch (err) {
      responseException(err);
    }
  }

  /**
   * [Method] 학교 페이지 구독 취소 메서드
   * @param user 사용자 ID
   * @param school 학교 ID
   * @returns 구독을 취소한 시간
   */
  async unsubscribe(user: string, school: string): Promise<Date> {
    try {
      // Key
      const key = this.createKey(user, school);
      // 갱신 데이터
      const updated = {
        unsubscribedAt: Date.now(),
      };

      // 구독 존재 여부 확인
      const subscription = await this.subscriptionRepository.findOne(key);
      // 예외 처리
      if (subscription === undefined || subscription === null) {
        responseNotFound('Not found a subscription.');
      } else if (subscription.unsubscribedAt !== 0) {
        responseBadRequest('Already been cancelled.');
      }

      // 기존 구독이 존재할 경우, 취소 처리
      await this.subscriptionRepository.update(key, updated);
      // 구독 취소 시간 반환
      return new Date(updated.unsubscribedAt);
    } catch (err) {
      responseException(err);
    }
  }

  /**
   * [Internal Method] 쿼리를 위한 키 생성 메서드
   * @param user 사용자 ID
   * @param school 학교 ID
   * @returns 데이터 스키마 키
   */
  private createKey(user: string, school: string): SubscriptionKey {
    return { user, school };
  }
}
