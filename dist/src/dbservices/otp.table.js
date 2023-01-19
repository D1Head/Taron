"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const Otp_1 = require("../models/Otp");
let OtpRepo = class OtpRepo {
    constructor() {
        this.create = (data) => __awaiter(this, void 0, void 0, function* () {
            const new_otp = yield new Otp_1.OtpModel(data).save();
            return new_otp;
        });
        this.find = (condition) => __awaiter(this, void 0, void 0, function* () {
            const otp = yield Otp_1.OtpModel.findOne(condition);
            return otp;
        });
        this.update = (condition, changes) => __awaiter(this, void 0, void 0, function* () {
            const update = yield Otp_1.OtpModel.findOneAndUpdate(condition, changes, {
                returnDocument: 'after',
            });
            return update;
        });
    }
};
OtpRepo = __decorate([
    (0, typedi_1.Service)()
], OtpRepo);
exports.default = OtpRepo;
//550038
