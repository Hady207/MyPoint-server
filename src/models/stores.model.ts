import mongoose from 'mongoose';

export interface Store {
  name: string;
  category: string;
  image: string;
  bookings: string[];
}

export const StoreSchema = new mongoose.Schema<Store>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    bookings: { type: [String] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
