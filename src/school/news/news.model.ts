import { Schema, model } from 'dynamoose';
// Interface
import type { News } from './news.interface';

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

const NewsModel = model<News>('classting-news', NewsSchema);

export default NewsModel;
