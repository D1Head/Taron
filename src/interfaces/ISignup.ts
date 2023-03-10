export interface ISignup {
  userName?: string;
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  DOB?: string;
  interests?: Array<string>;
  active?: boolean;
  suspended?: boolean;
  deleted?: boolean;
  country?: string;
  state?: string;
  geoLocation?: string;
  currency?: string;
  street?: string;
  profileUlr?: string;
  otp?: string;
}