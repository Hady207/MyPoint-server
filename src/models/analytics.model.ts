import { Schema, Types } from 'mongoose';

export interface Analytics {
  store: Types.ObjectId;
  bookedTickets?: [Types.ObjectId];
  bookedMonths: Array<string>;
  bookedTimes: Array<string>;
}

export const AnalyticsSchema = new Schema<Analytics>(
  {
    store: { type: Schema.Types.ObjectId, ref: 'Store' },
    bookedTickets: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    bookedMonths: [String],
    bookedTimes: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
