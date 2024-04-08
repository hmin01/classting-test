import { Schema } from 'dynamoose';

export const NewsSchemaName: string = 'classting-news';

const NewsSchema = new Schema({
  school: {
    type: String,
    hashKey: true,
    required: true,
  },
  createdAt: {
    type: Number,
    rangeKey: true,
  },
  content: String,
  editedAt: Number,
});

export default NewsSchema;
