"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validateReq = void 0;
const joi_1 = __importDefault(require("joi"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../utils/pick"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const validateReq = (schema) => (req, res, next) => {
    const validSchema = (0, pick_1.default)(schema, ['params', 'query', 'body']);
    const object = (0, pick_1.default)(req, Object.keys(validSchema));
    const { value, error } = check(validSchema, object);
    if (error) {
        const errorMessage = error.details
            .map((details) => details.message)
            .join(', ');
        return next(new ApiError_1.default(http_status_1.default.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};
exports.validateReq = validateReq;
const check = (schema, data) => {
    const object = (0, pick_1.default)(data, Object.keys(schema));
    return joi_1.default.compile(schema)
        .prefs({ errors: { label: 'key' } })
        .validate(object);
};
const validate = (schema, data) => {
    const { value, error } = check(schema, data);
    if (error) {
        const errorMessage = error.details
            .map((details) => details.message)
            .join(', ');
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, errorMessage);
    }
    return value;
};
exports.validate = validate;
