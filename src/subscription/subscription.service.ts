import { Injectable } from '@nestjs/common';
// Model
import SubscriptionModel from './subscription.model';
// Utility
import {
  responseBadRequest,
  responseException,
  responseNotFound,
} from '../utils/response';
// Type
import type { Subscription } from './subscription.interface';

@Injectable()
export class SubscriptionService {
  /**
   * [Method] 구독 중인 학교 목록 조회 메서드
   * @param user 사용자 ID
   * @returns 조건에 부합하는 구독 데이터
   */
  async getList(user: string): Promise<Subscription[]> {
    try {
      // 데이터 조회
      const result = await SubscriptionModel.query('user')
        .eq(user)
        .where('unsubscribedAt')
        .eq(0)
        .attributes(['school', 'subscribedAt'])
        .exec();
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
      // 구독 존재 여부 확인
      const subscribe = await SubscriptionModel.get(
        this.createKey(user, school),
      );
      // 예외 처리
      if (subscribe === undefined || subscribe === null) {
        responseNotFound();
      }
      // 구독 정보 반환
      return subscribe;
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
      return await SubscriptionModel.query('user')
        .eq(user)
        .attributes(['school', 'subscribedAt', 'unsubscribedAt'])
        .exec();
    } catch (err) {
      responseException(err);
    }
  }

  /**
   * [Method] 학교 페이지 구독 메서드
   * @param user 사용자 ID
   * @param school 학교 ID
   * @returns 구독한 시간
   */
  async subscribe(user: string, school: string): Promise<Date> {
    try {
      // 갱신 데이터
      const updated = {
        subscribedAt: Date.now(),
        unsubscribedAt: 0,
      };

      // 구독 존재 여부 확인
      const subscribe = await SubscriptionModel.get(
        this.createKey(user, school),
      );
      // 예외 처리
      if (subscribe && subscribe.unsubscribedAt === 0) {
        responseBadRequest('Already been subscribed.');
      }

      // 기존 데이터가 존재하면 갱신, 없을 경우 생성하기 위해 update() 메서드 사용
      await SubscriptionModel.update(this.createKey(user, school), updated);
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
      // 갱신 데이터
      const updated = {
        unsubscribedAt: Date.now(),
      };

      // 구독 존재 여부 확인
      const subscribe = await SubscriptionModel.get(
        this.createKey(user, school),
      );
      // 예외 처리
      if (subscribe === undefined || subscribe === null) {
        responseNotFound('Not found a subscription.');
      } else if (subscribe.unsubscribedAt !== 0) {
        responseBadRequest('Already been cancelled.');
      }

      // 기존 구독이 존재할 경우, 취소 처리
      await SubscriptionModel.update(this.createKey(user, school), updated);
      // 구독 취소 시간 반환
      return new Date(updated.unsubscribedAt);
      return;
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
  private createKey(user: string, school: string) {
    return { user, school };
  }
}
