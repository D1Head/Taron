import httpStatus from 'http-status';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import Helpers from '../utils/helper.service';
import { generateToken } from '../utils/tokenManagement';
import { abortIf } from '../utils/responder';
import { generate_random_password, hash } from '../utils/passwordHash';
import { Service } from 'typedi';
import path from 'path';
import moment from 'moment';
import { paginate, paginateOptions } from '../utils/paginate';
import UserRepo from '../dbservices/user.table';
import { IUser } from '../models/User';
import {
  IRequestSignUpOtp,
  IVerifyOtp,
  ISignup,
  ILogin,
} from '../interfaces';
import OtpRepo from '../dbservices/otp.table';
import { IOtp } from '../models/Otp';
import Dtos from '../Dto/user.dto';

@Service()
export default class AuthService {
  /**
   *
   */
  constructor(
    private readonly userRepo: UserRepo,
    private readonly otpRepo: OtpRepo
  ) {}
  register = async (data: ISignup) => {
    const user = await this.userRepo.find({ email: data.email });
    abortIf(user, httpStatus.BAD_REQUEST, 'Email already Exists');
    abortIf(
      data.password !== data.confirmPassword,
      httpStatus.BAD_REQUEST,
      'Passwords do not match'
    );
    data.password = data.password.trim();
    const hashed_password = await hash(data.password);
    //create provider
    const find_otp = await this.otpRepo.find({
      email: data.email,
      otp: data.otp,
    });
    abortIf(!find_otp, httpStatus.BAD_REQUEST, 'This OTP does not exist');
    const _data = {
      email: data.email.toLowerCase().trim(),
      password: hashed_password,
      DOB: data.DOB,
      active: true,
      interests: data.interests,
      suspended: false,
      fullName: data.fullName,
      userName: Helpers.slugifyName(data.fullName),
      geoLocation: data.geoLocation,
      country: data.country,
      currency: data.currency,
      profileUlr: data.profileUlr,
      state: data.state,
      street: data.street,
    };
    const create = await this.userRepo.createUser(_data);
    const userDto = Dtos.userDTO(create);
    const token = await generateToken(userDto);
    return { ...userDto, token };
  };

  requestOtp = async (data: IRequestSignUpOtp) => {
    //generate otp
    const otp: string = Helpers.generateRandom(4, 'numeric');
    //store otp on DB
    const create_otp = this.otpRepo.create({
      otp,
      email: data.email.toLowerCase().trim(),
    });
    //send otp via email
    return { otp };
  };

  verifyAuthOtp = async (data: IVerifyOtp) => {
    const find_otp = this.otpRepo.find({ email: data.email, otp: data.otp });
    abortIf(!find_otp, httpStatus.BAD_REQUEST, 'This OTP does not exist');
  };

  login = async (data: ILogin) => {
    let { email, password } = data;
    email = email.trim().toLowerCase();
    password = password.trim();
    let user = await this.userRepo.find({ email });
    abortIf(!user, httpStatus.BAD_REQUEST, 'Invalid Credentials');
    const password_check = await bcrypt.compare(password, user.password);
    abortIf(!password_check, httpStatus.BAD_REQUEST, 'Invalid Credentials');
    const userDto = Dtos.userDTO(user);
    const token = await generateToken(userDto);
    /**
     *  ==> Call Notification Service <==
     */
    return { ...userDto, token };
  };
}
