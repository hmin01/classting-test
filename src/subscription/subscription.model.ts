import { Schema, model } from 'dynamoose';
// Type
import type { Subscription } from './subscription.interface';

export const SubscriptionSchema = new Schema({
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

const SubscriptionModel = model<Subscription>(
  'classting-subscription',
  SubscriptionSchema,
);

export default SubscriptionModel;
