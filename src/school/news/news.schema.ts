import { Schema } from 'dynamoose';

export interface NewsKey {
  // Partition key (= school id)
  school: string;
  // Sort key
  createdAt: number;
}

export interface News extends NewsKey {
  content: string;
  editedAt?: number;
}

export const NewsSchema = new Schema({
  school: {
    type: String,
    hashKey: true,
  },
  createdAt: {
    type: Number,
    rangeKey: true,
  },
  content: String,
  editedAt: Number,
});
