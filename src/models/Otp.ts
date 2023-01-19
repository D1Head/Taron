import { Document, Schema, Types, model } from 'mongoose';

// (first_name, last_name, email, phone)

// user interface
export interface IOtp extends Document {
  //   _id?: string;
  email?: string;
  otp?: string;
}

// user schema
const OtpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
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
export const OtpModel = model<IOtp>('Otp', OtpSchema);
