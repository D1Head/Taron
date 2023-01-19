import { Document, Schema, Types, model } from 'mongoose';

// (first_name, last_name, email, phone)

// user interface
export interface IUser extends Document {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  DOB: string;
  interests: Array<string>;
  active: boolean;
  suspended: boolean;
  deleted: boolean;
  country: string;
  state: string;
  geoLocation: string;
  currency: string;
  street: string;
  profileUlr: string;
}

// user schema
const UserSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    DOB: {
      type: String,
      required: true,
    },
    interests: [{ type: String }],
    active: {
      type: Boolean,
      default: false,
    },
    suspended: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    geoLocation: {
      type: String,
    },
    currency: {
      type: String,
    },
    street: {
      type: String,
    },
    profileUlr: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

// create and export user model
export const UserModel = model<IUser>('User', UserSchema);
