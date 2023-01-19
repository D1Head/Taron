"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateAdminToken = exports.generateToken = void 0;
// require('dotenv').config();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const jwt = require('jsonwebtoken');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const key_1 = require("../../key");
let token_secret = key_1.values.token_secret;
const generateToken = (data) => {
    const access_token = jsonwebtoken_1.default.sign(data, token_secret, {
        expiresIn: '10000h',
    });
    const refresh_token = jsonwebtoken_1.default.sign(data, token_secret, {
        expiresIn: '1d',
    });
    return {
        access_token,
        refresh_token,
    };
};
exports.generateToken = generateToken;
const generateAdminToken = (data) => {
    const access_token = jsonwebtoken_1.default.sign(data, token_secret, {
        expiresIn: '60000h',
    });
    const refresh_token = jsonwebtoken_1.default.sign(data, token_secret, {
        expiresIn: '1d',
    });
    return {
        access_token,
        refresh_token,
    };
};
exports.generateAdminToken = generateAdminToken;
const verifyToken = (token) => {
    const data = jsonwebtoken_1.default.verify(token, token_secret);
    return data;
};
exports.verifyToken = verifyToken;
