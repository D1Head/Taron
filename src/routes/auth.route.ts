import 'reflect-metadata';
import { Router } from 'express';
// const { signUpValidate } = require("../validations/user.validations");
import authController from '../controller/auth.controller';
import { Container } from 'typedi';
import {
  createUser,
  login,
  requestSignUpOtp,
} from '../validations/all.validation';
import { validateReq } from '../middleware/validate';

const router = Router();

const controller = Container.get(authController);

router.post('/login', validateReq(login), controller.loginController);

router.post('/signup', controller.registerController);

router.post(
  '/request-signup-otp',
  validateReq(requestSignUpOtp),
  controller.requestOtpController
);

export { router };
// ts-node-dev --respawn --pretty --transpile-only
