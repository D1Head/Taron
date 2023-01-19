"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, message, isOperational = false, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;