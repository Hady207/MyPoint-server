import { Schema, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface User {
  username: string;
  password: string;
  role: string;
  profileImage?: string;
  active: boolean;
  bookingTickets: Types.ObjectId[];
  storeAdmin: Types.ObjectId;
}

export const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['admin', 'user', 'super_admin'],
      default: 'user',
    },
    profileImage: { type: String },
    active: { type: Boolean, default: true, select: false },
    bookingTickets: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    storeAdmin: { type: Schema.Types.ObjectId, ref: 'Store' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

UserSchema.pre('save', async function (next) {
  // Only run this function if password is actually modified
  if (!this.isModified('password')) return next();
  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
