"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const http_status_1 = __importDefault(require("http-status"));
const responder_1 = require("../utils/responder");
const tokenManagement_1 = require("../utils/tokenManagement");
const verify = (req, res, next) => {
    (0, responder_1.abortIf)(!req.headers['authorization'], http_status_1.default.FORBIDDEN, 'token expired please login');
    const token = req.headers['authorization'].split(' ')[1];
    (0, responder_1.abortIf)(!token || token == '', http_status_1.default.FORBIDDEN, 'token expired please login');
    const data = (0, tokenManagement_1.verifyToken)(token);
    (0, responder_1.abortIf)(!data, http_status_1.default.FORBIDDEN, 'token expired please login');
    const user = {
        user_id: data._id,
    };
    req.body.token = user;
    next();
};
exports.verify = verify;
