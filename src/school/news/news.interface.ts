// Type
import type { Item } from 'dynamoose/dist/Item';

export interface NewsKey {
  // [Partition key] 학교 ID
  school: string;
  // [Sort key] 생성 시간 (Timestamp)
  createdAt: number;
}
export interface News extends NewsKey, Item {
  // 내용
  content: string;
  // 수정 시간 (Timestamp)
  editedAt?: number;
}
