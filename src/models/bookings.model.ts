import { Schema, Types } from 'mongoose';
import * as QRCode from 'qrcode';

export interface Booking {
  bookingDate: Date;
  bookingTime?: Date;
  qrcode: string;
  user: Types.ObjectId;
  active: boolean;
  scanned: boolean;
  store: Types.ObjectId;
}

export const BookingSchema = new Schema<Booking>(
  {
    bookingDate: { type: Date, required: true },
    bookingTime: { type: Date },
    qrcode: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    active: { type: Boolean, default: true },
    scanned: { type: Boolean, default: false },
    store: { type: Schema.Types.ObjectId, ref: 'Store' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

BookingSchema.pre('save', async function (next) {
  this.qrcode = await QRCode.toDataURL(this?.id);

  next();
});
