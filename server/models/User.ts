import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  banner: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  statusMessage?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
  lastSeen: Date;
  nitroSubscription?: {
    active: boolean;
    expiresAt?: Date;
    tier: 'standard' | 'premium';
  };
  preferences?: {
    theme: 'dark' | 'light';
    notifications: boolean;
    soundEnabled: boolean;
  };
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    banner: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['online', 'idle', 'dnd', 'offline'],
      default: 'offline',
    },
    statusMessage: {
      type: String,
      maxlength: 128,
    },
    bio: {
      type: String,
      maxlength: 256,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    nitroSubscription: {
      active: { type: Boolean, default: false },
      expiresAt: Date,
      tier: { type: String, enum: ['standard', 'premium'], default: 'standard' },
    },
    preferences: {
      theme: { type: String, enum: ['dark', 'light'], default: 'dark' },
      notifications: { type: Boolean, default: true },
      soundEnabled: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
