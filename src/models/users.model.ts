import { Schema, Types } from 'mongoose';

export interface User {
  username: string;
  password: string;
  role: string;
  profileImage?: string;
  active: boolean;
  bookingTickets: Types.ObjectId[];
}

export const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    password: { Type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    profileImage: { type: String },
    active: { type: Boolean, default: true, select: false },
    bookingTickets: [{ type: Schema.Types.ObjectId, ref: 'Tickets' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
