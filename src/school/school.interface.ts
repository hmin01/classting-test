// Type
import type { Item } from 'dynamoose/dist/Item';

export interface School extends Item {
  // [Partition key] 아이디
  uuid: string;
  // 지역
  region: string;
  // 학교명
  name: string;
}
