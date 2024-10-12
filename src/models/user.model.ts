import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  role: 'admin' | 'regular';
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'regular'], default: 'regular' },
  username: { type: String },

});

export const User = mongoose.model<IUser>('User', UserSchema);
