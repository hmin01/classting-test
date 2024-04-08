import { Schema } from 'dynamoose';

export const SubscriptionSchemaName: string = 'classting-subscription';

const SubscriptionSchema = new Schema({
  user: {
    type: String,
    hashKey: true,
    required: true,
  },
  school: {
    type: String,
    rangeKey: true,
  },
  subscribedAt: Number,
  unsubscribedAt: Number,
});

export default SubscriptionSchema;
