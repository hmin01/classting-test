import { Schema } from 'dynamoose';

export interface SchoolKey {
  uuid: string;
}

export interface School extends SchoolKey {
  region: string;
  name: string;
}

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
