import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
// DTO
import { SubscribeDto } from './subscribe.dto';
// Interface
import { Subscribe, SubscribeKey } from './subscribe.schema';
// Utility
import { responseException } from 'utils/response';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectModel('classting-subscribe')
    private subscribeModel: Model<Subscribe, SubscribeKey>,
  ) {}

  async subscribe(subscribeDto: SubscribeDto) {
    // 생성 시각 (Timestamp)
    const subscribedAt = Date.now();
    // 데이터 저장을 위한 객체 생성
    const info: Subscribe = {
      school: subscribeDto.school_id,
      user: subscribeDto.user_id,
      subscribedAt,
    };

    try {
      await this.subscribeModel.create(info);
    } catch (err) {
      responseException(err);
    }
  }

  async unsubscribe(subscribeDto: SubscribeDto) {
    // 구독 취소 시각 (Timestamp)
    const unsubscribedAt = Date.now();
    // 업데이트를 위한 객체 생성
    const key: SubscribeKey = {
      user: subscribeDto.user_id,
      school: subscribeDto.school_id,
    };
    const updated = { unsubscribedAt };

    try {
      // 업데이트
      const result = await this.subscribeModel.update(key, updated);
      console.log('result', result);
    } catch (err) {
      responseException(err);
    }
  }

  async findOne(user: string, school: string) {
    try {
      return await this.subscribeModel.get({ user, school });
    } catch (err) {
      responseException(err);
    }
  }
}
