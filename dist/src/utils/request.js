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
exports.axiosPOST = exports.axiosGET = exports.apiCall = void 0;
const axios_1 = __importDefault(require("axios"));
const apiCall = (method, url, data, headers) => __awaiter(void 0, void 0, void 0, function* () {
    if (method === 'POST') {
        const call = yield axios_1.default.post(url, data, { headers });
        return call.data;
    }
    const call = yield axios_1.default.get(url, { headers });
    // console.log(await call, 'There There');
    return call.data;
});
exports.apiCall = apiCall;
const axiosGET = (url, headers) => __awaiter(void 0, void 0, void 0, function* () {
    return yield apiCall('GET', url, null, headers);
});
exports.axiosGET = axiosGET;
const axiosPOST = (url, data, headers) => __awaiter(void 0, void 0, void 0, function* () {
    return yield apiCall('POST', url, data, headers);
});
exports.axiosPOST = axiosPOST;
