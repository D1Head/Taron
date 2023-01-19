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
exports.downloadPdfFile = exports.downloadFile = exports.download = exports.redirect = exports.abortUnless = exports.abortIf = exports.abort = exports.errorResponse = exports.successResponse = exports.ApiResponder = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("./ApiError"));
const stream_1 = __importDefault(require("stream"));
const ApiResponder = (res, statusCode, message, payload, extra = {}) => {
    res.status(statusCode).send(Object.assign({ status: statusCode, success: statusCode === http_status_1.default.OK || statusCode === http_status_1.default.CREATED
            ? 'true'
            : 'false', message, data: payload }, extra));
};
exports.ApiResponder = ApiResponder;
const redirectResponder = (res, redirect_url) => {
    res.redirect(redirect_url);
};
const downloadResponder = (res, filepath, filename) => {
    res.download(filepath, filename);
};
const redirect = (res, redirect_url) => {
    return redirectResponder(res, redirect_url);
};
exports.redirect = redirect;
const download = (res, filepath, filename) => {
    console.log('About to download');
    return downloadResponder(res, filepath, filename);
};
exports.download = download;
const downloadPdfFile = (fileData, res, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    var fileContents = Buffer.from(fileData, 'base64');
    var readStream = new stream_1.default.PassThrough();
    readStream.end(fileContents);
    res.set('Content-disposition', 'attachment; filename=' + fileName);
    res.set('Content-Type', 'application/pdf');
    readStream.pipe(res);
});
exports.downloadPdfFile = downloadPdfFile;
const downloadFile = (fileDate, res, fileName, content_type) => __awaiter(void 0, void 0, void 0, function* () {
    var fileContents = Buffer.from(fileDate, 'base64');
    var readStream = new stream_1.default.PassThrough();
    readStream.end(fileContents);
    res.set('Content-disposition', 'attachment; filename=' + fileName);
    res.setHeader('Content-Type', content_type);
    return readStream.pipe(res);
});
exports.downloadFile = downloadFile;
const zipDownload = () => __awaiter(void 0, void 0, void 0, function* () { });
// async function sendWorkbook(workbook, response) {}
const successResponse = (res, payload = {}, message = 'Success') => {
    return ApiResponder(res, http_status_1.default.OK, message, payload);
};
exports.successResponse = successResponse;
const errorResponse = (res, message = null, statusCode = http_status_1.default.INTERNAL_SERVER_ERROR, extra = {}) => {
    const httpMessage = message || http_status_1.default[statusCode];
    return ApiResponder(res, statusCode, httpMessage, {}, extra);
};
exports.errorResponse = errorResponse;
const abort = (status, message) => {
    console.log(status, message);
    throw new ApiError_1.default(status, message);
};
exports.abort = abort;
const abortIf = (condition, status, message) => {
    if (condition)
        abort(status, message);
};
exports.abortIf = abortIf;
const abortUnless = (condition, status, message) => {
    if (!condition)
        abort(status, message);
};
exports.abortUnless = abortUnless;
