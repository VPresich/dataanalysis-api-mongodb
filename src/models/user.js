import mongoose from 'mongoose';
import { EMAIL_PATTERN, NAME_PATTERN } from '../constants/index.js';
import crypto from 'node:crypto';

const userSchema = new mongoose.Schema(
  {
    // MongoDB automatically creates _id (ObjectId) for each document
    name: {
      type: String,
      required: [true, 'Name is required'],
      match: [
        NAME_PATTERN,
        'Name must be 2-32 characters, letters, numbers, special characters allowed',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: EMAIL_PATTERN,
    },
    token: {
      type: String,
      default: null, // JWT token will be stored here
    },
    avatarURL: {
      type: String,
      required: true, // URL of user avatar
    },
    verify: {
      type: Boolean,
      default: false, // indicates whether email is verified
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
      default: () => crypto.randomUUID(), // generate unique verification token
    },
    theme: {
      type: String,
      enum: ['yellow', 'green', 'blue', 'pink', 'red', 'default'], // allowed theme colors
      default: 'yellow',
      lowercase: true,
    },
    googleId: {
      type: String,
      sparse: true, // unique but optional for Google OAuth
    },
  },
  {
    versionKey: false,
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

export default mongoose.model('User', userSchema);
