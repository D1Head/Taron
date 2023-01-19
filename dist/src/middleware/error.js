"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
// const ApiError = require('../utils/ApiError');
// const { errorResponse } = require('../utils/responder');
const responder_1 = require("../utils/responder");
const errorConverter = (err, req, res, next) => {
    let error = err;
    if (error.name === 'CastError') {
        const message = `Resource not found`;
        error = new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Resource not Found');
    }
    if (err.name === 'TokenExpiredError') {
        const message = 'Token expired';
        error = new ApiError_1.default(http_status_1.default.FORBIDDEN, message);
    }
    // Mongoose duplicate key
    if (error.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ApiError_1.default(http_status_1.default.BAD_REQUEST, message);
    }
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ApiError_1.default(http_status_1.default.BAD_REQUEST, message);
    }
    if (err.name === 'JsonWebTokenError') {
        const message = 'token expired';
        error = new ApiError_1.default(http_status_1.default.FORBIDDEN, message);
    }
    if (!(error instanceof ApiError_1.default)) {
        const statusCode = error.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR;
        const message = error.message || http_status_1.default[statusCode];
        error = new ApiError_1.default(statusCode, message, false, err.stack);
    }
    next(error);
};
exports.errorConverter = errorConverter;
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    statusCode = statusCode || http_status_1.default.INTERNAL_SERVER_ERROR;
    if (statusCode === http_status_1.default.INTERNAL_SERVER_ERROR) {
        message = 'Oh sugar! we have a problem, please check back later';
    }
    res.locals.errorMessage = err.message;
    if (statusCode === http_status_1.default.INTERNAL_SERVER_ERROR ||
        process.env.ENV === 'test') {
        console.log(err);
    }
    return (0, responder_1.errorResponse)(res, message, statusCode, process.env.ENV === 'test' && { stack: err.stack });
};
exports.errorHandler = errorHandler;
