import { Schema } from 'dynamoose';

export const SchoolSchema = new Schema({
  uuid: {
    type: String,
    hashKey: true,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
