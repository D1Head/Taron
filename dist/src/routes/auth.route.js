"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
require("reflect-metadata");
const express_1 = require("express");
// const { signUpValidate } = require("../validations/user.validations");
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const typedi_1 = require("typedi");
const all_validation_1 = require("../validations/all.validation");
const validate_1 = require("../middleware/validate");
const router = (0, express_1.Router)();
exports.router = router;
const controller = typedi_1.Container.get(auth_controller_1.default);
router.post('/login', (0, validate_1.validateReq)(all_validation_1.login), controller.loginController);
router.post('/signup', controller.registerController);
router.post('/request-signup-otp', (0, validate_1.validateReq)(all_validation_1.requestSignUpOtp), controller.requestOtpController);
// ts-node-dev --respawn --pretty --transpile-only
