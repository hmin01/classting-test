export interface SubscriptionKey {
  // [Partition key] 사용자 ID
  user: string;
  // [Sort key] 학교 ID
  school?: string;
}

export interface Subscription extends SubscriptionKey {
  // 구독 시작 시간 (Timestamp)
  subscribedAt: number;
  // 구독 취소 시간 (Timestamp)
  unsubscribedAt?: number;
}

export class SubscriptionRange {
  // 구독 시작 시간 (Timestamp)
  subscribedAt?: number;
  // 구독 취소 시간 (Timestamp)
  unsubscribedAt?: number;
}
