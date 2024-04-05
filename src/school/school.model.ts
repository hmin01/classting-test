import { Schema, model } from 'dynamoose';
// Interface
import type { School } from './school.interface';

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

const SchoolModel = model<School>('classting-school', SchoolSchema);

export default SchoolModel;
