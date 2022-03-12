import { Schema, Types } from 'mongoose';

export interface Ticket {
  bookingTime: Date;
  bookingData: Date;
  user: Types.ObjectId;
  active: boolean;
  scanned: boolean;
  store: Types.ObjectId;
}

export const TicketSchema = new Schema<Ticket>(
  {
    bookingTime: { type: Date, required: true },
    bookingData: { Type: Date, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    active: { type: Boolean, default: true },
    scanned: { type: Boolean },
    store: { type: Schema.Types.ObjectId, ref: 'Stores' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
