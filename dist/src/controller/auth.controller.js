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
// const catchAsync = require('../utils/catchAsync');
const catchAsync_1 = require("../utils/catchAsync");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const responder_1 = require("../utils/responder");
// import httpStatus from 'http-status';
const typedi_1 = require("typedi");
// import { paginateOptions } from '../utils/paginate';
// import console from 'console';
let AuthController = class AuthController {
    /**
     *
     */
    constructor(authService) {
        this.authService = authService;
        this.loginController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const _create = yield this.authService.login(req.body);
            return (0, responder_1.successResponse)(res, _create);
        }));
        this.registerController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const _update = yield this.authService.register(req.body);
            return (0, responder_1.successResponse)(res, _update);
        }));
        this.requestOtpController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const _update = yield this.authService.requestOtp(req.body);
            return (0, responder_1.successResponse)(res, _update);
        }));
    }
};
AuthController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [auth_service_1.default])
], AuthController);
exports.default = AuthController;
