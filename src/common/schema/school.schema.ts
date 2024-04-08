import { Schema } from 'dynamoose';

export const SchoolSchemaName = 'classting-school';

const SchoolSchema = new Schema({
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

export default SchoolSchema;
