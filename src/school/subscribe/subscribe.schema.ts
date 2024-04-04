import { Schema } from 'dynamoose';

export interface SubscribeKey {
  // Partition key
  user: string;
  // Sort key
  school: string;
}

export interface Subscribe extends SubscribeKey {
  subscribedAt: number;
  unsubscribedAt?: number;
}

export const SubscribeSchema = new Schema({
  user: {
    type: String,
    hashKey: true,
  },
  school: {
    type: String,
    rangeKey: true,
  },
  subscribedAt: Number,
  unsubscribedAt: Number,
});
