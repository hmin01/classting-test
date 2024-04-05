// Type
import type { Item } from 'dynamoose/dist/Item';

export interface Subscription extends Item {
  // [Partition Key] 사용자 ID
  user: string;
  // [Sort key] 학교 ID
  school: string;
  // 구독 시작 시간 (Timestamp)
  subscribedAt: number;
  // 구독 취소 시간 (Timestamp)
  unsubscribedAt?: number;
}
