import { Schema, Types } from 'mongoose';

export interface Store {
  name: string;
  category: string;
  image: string;
  bookings: Types.ObjectId[];
}

export const StoreSchema = new Schema<Store>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
