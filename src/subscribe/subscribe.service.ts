import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
// Interface
import { Subscribe, SubscribeKey } from './subscribe.schema';
// Utility
import {
  responseBadRequest,
  responseException,
  responseNotFound,
} from 'utils/response';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectModel('classting-subscribe')
    private subscribeModel: Model<Subscribe, SubscribeKey>,
  ) {}

  async findAll(user: string): Promise<Subscribe[]> {
    try {
      // 데이터 조회
      const result = await this.subscribeModel
        .query('user')
        .eq(user)
        .where('unsubscribedAt')
        .eq(0)
        .attributes(['school', 'subscribedAt'])
        .exec();
      // 데이터 가공 및 반환
      return result.map((elem: Subscribe): any => ({
        school: elem.school,
        subscribedAt: new Date(elem.subscribedAt),
      }));
    } catch (err) {
      responseException(err);
    }
  }

  async findAllBySchool(user: string) {
    try {
      return await this.subscribeModel
        .query('user')
        .eq(user)
        .attributes(['school', 'subscribedAt', 'unsubscribedAt'])
        .exec();
    } catch (err) {
      responseException(err);
    }
  }

  async subscribe(user: string, school: string): Promise<Subscribe> {
    const updated = {
      subscribedAt: Date.now(),
      unsubscribedAt: 0,
    };

    try {
      // 기존 데이터가 존재하면 갱신, 없을 경우 생성하기 위해 update() 메서드 사용
      return await this.subscribeModel.update(
        this.createKey(user, school),
        updated,
      );
    } catch (err) {
      responseException(err);
    }
  }

  async unsubscribe(user: string, school: string): Promise<Subscribe> {
    const updated = {
      unsubscribedAt: Date.now(),
    };

    try {
      // 구독 존재 여부 확인
      const subscribe = await this.subscribeModel.get(
        this.createKey(user, school),
      );
      // 예외 처리
      if (subscribe === undefined || subscribe === null) {
        responseNotFound('Not found a subscription.');
      } else if (subscribe.unsubscribedAt !== 0) {
        responseBadRequest('Already been cancelled.');
      }
      console.log('sub', subscribe);
      // 기존 구독이 존재할 경우, 취소 처리
      return await this.subscribeModel.update(
        this.createKey(user, school),
        updated,
      );
    } catch (err) {
      responseException(err);
    }
  }

  private createKey(user: string, school: string): SubscribeKey {
    return { user, school };
  }
}
