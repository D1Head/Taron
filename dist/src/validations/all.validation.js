"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSignUpOtp = exports.createProperty = exports.login = exports.createUser = void 0;
const joi_1 = __importDefault(require("joi"));
const createUser = {
    body: joi_1.default.object().keys({
        first_name: joi_1.default.string().required(),
        last_name: joi_1.default.string().required(),
        email: joi_1.default.string().required(),
        phone: joi_1.default.string().required(),
    }),
};
exports.createUser = createUser;
const createProperty = {
    body: joi_1.default.object().keys({
        name: joi_1.default.string().optional(),
        address: joi_1.default.string().optional(),
        type: joi_1.default.string().optional(),
        description: joi_1.default.string().optional(),
        total_rooms: joi_1.default.string().optional(),
        occupancy_type: joi_1.default.string().optional(),
        rent_amount: joi_1.default.string().optional(),
        currency: joi_1.default.string().optional(),
        rent_frequency: joi_1.default.string().optional(),
        is_published: joi_1.default.boolean().optional(),
    }),
    file: joi_1.default.object().keys({
        image: joi_1.default.string().optional(),
    }),
};
exports.createProperty = createProperty;
const updateProperty = {
    body: joi_1.default.object().keys({
        name: joi_1.default.string().optional(),
        address: joi_1.default.string().optional(),
        type: joi_1.default.string().optional(),
        description: joi_1.default.string().optional(),
        total_rooms: joi_1.default.string().optional(),
        occupancy_type: joi_1.default.string().optional(),
        rent_amount: joi_1.default.string().optional(),
        currency: joi_1.default.string().optional(),
        rent_frequency: joi_1.default.string().optional(),
        is_published: joi_1.default.boolean().optional(),
    }),
};
const login = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    }),
};
exports.login = login;
const requestSignUpOtp = {
    body: joi_1.default.object().keys({
        fullName: joi_1.default.string().required(),
        email: joi_1.default.string().required(),
        DOB: joi_1.default.string().required(),
    }),
};
exports.requestSignUpOtp = requestSignUpOtp;
