"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helper_service_1 = __importDefault(require("../utils/helper.service"));
const tokenManagement_1 = require("../utils/tokenManagement");
const responder_1 = require("../utils/responder");
const passwordHash_1 = require("../utils/passwordHash");
const typedi_1 = require("typedi");
const user_table_1 = __importDefault(require("../dbservices/user.table"));
const otp_table_1 = __importDefault(require("../dbservices/otp.table"));
const user_dto_1 = __importDefault(require("../Dto/user.dto"));
let AuthService = class AuthService {
    /**
     *
     */
    constructor(userRepo, otpRepo) {
        this.userRepo = userRepo;
        this.otpRepo = otpRepo;
        this.register = (data) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.find({ email: data.email });
            (0, responder_1.abortIf)(user, http_status_1.default.BAD_REQUEST, 'Email already Exists');
            (0, responder_1.abortIf)(data.password !== data.confirmPassword, http_status_1.default.BAD_REQUEST, 'Passwords do not match');
            data.password = data.password.trim();
            const hashed_password = yield (0, passwordHash_1.hash)(data.password);
            //create provider
            const find_otp = yield this.otpRepo.find({
                email: data.email,
                otp: data.otp,
            });
            (0, responder_1.abortIf)(!find_otp, http_status_1.default.BAD_REQUEST, 'This OTP does not exist');
            const _data = {
                email: data.email.toLowerCase().trim(),
                password: hashed_password,
                DOB: data.DOB,
                active: true,
                interests: data.interests,
                suspended: false,
                fullName: data.fullName,
                userName: helper_service_1.default.slugifyName(data.fullName),
                geoLocation: data.geoLocation,
                country: data.country,
                currency: data.currency,
                profileUlr: data.profileUlr,
                state: data.state,
                street: data.street,
            };
            const create = yield this.userRepo.createUser(_data);
            const userDto = user_dto_1.default.userDTO(create);
            const token = yield (0, tokenManagement_1.generateToken)(userDto);
            return Object.assign(Object.assign({}, userDto), { token });
        });
        this.requestOtp = (data) => __awaiter(this, void 0, void 0, function* () {
            //generate otp
            const otp = helper_service_1.default.generateRandom(4, 'numeric');
            //store otp on DB
            const create_otp = this.otpRepo.create({
                otp,
                email: data.email.toLowerCase().trim(),
            });
            //send otp via email
            return { otp };
        });
        this.verifyAuthOtp = (data) => __awaiter(this, void 0, void 0, function* () {
            const find_otp = this.otpRepo.find({ email: data.email, otp: data.otp });
            (0, responder_1.abortIf)(!find_otp, http_status_1.default.BAD_REQUEST, 'This OTP does not exist');
        });
        this.login = (data) => __awaiter(this, void 0, void 0, function* () {
            let { email, password } = data;
            email = email.trim().toLowerCase();
            password = password.trim();
            let user = yield this.userRepo.find({ email });
            (0, responder_1.abortIf)(!user, http_status_1.default.BAD_REQUEST, 'Invalid Credentials');
            const password_check = yield bcryptjs_1.default.compare(password, user.password);
            (0, responder_1.abortIf)(!password_check, http_status_1.default.BAD_REQUEST, 'Invalid Credentials');
            const userDto = user_dto_1.default.userDTO(user);
            const token = yield (0, tokenManagement_1.generateToken)(userDto);
            /**
             *  ==> Call Notification Service <==
             */
            return Object.assign(Object.assign({}, userDto), { token });
        });
    }
};
AuthService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [user_table_1.default,
        otp_table_1.default])
], AuthService);
exports.default = AuthService;
