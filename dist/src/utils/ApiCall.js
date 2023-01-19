"use strict";
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
exports.POST = exports.GET = void 0;
const axios_1 = __importDefault(require("axios"));
const apiCall = (method, url, data, extra = null) => __awaiter(void 0, void 0, void 0, function* () {
    if (method === 'POST') {
        return yield axios_1.default.post(url, data, Object.assign({}, extra));
    }
    return yield axios_1.default.get(url, Object.assign({}, data));
});
const axiosGET = (url, data = null) => __awaiter(void 0, void 0, void 0, function* () {
    return apiCall('GET', url, data);
});
exports.GET = axiosGET;
const axiosPOST = (url, data, extra = null) => __awaiter(void 0, void 0, void 0, function* () {
    return apiCall('POST', url, data, extra);
});
exports.POST = axiosPOST;
