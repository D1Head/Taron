"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = void 0;
const cloudinary_1 = require("cloudinary");
const responder_1 = require("./responder");
const http_status_1 = __importDefault(require("http-status"));
cloudinary_1.v2.config({
    cloud_name: 'dsavh0wlc',
    api_key: '565295426515125',
    api_secret: 'U7OS6MyKGVtHnId5qNMsan-hsrE',
});
const cloudinaryUpload = (image) => {
    const upload = cloudinary_1.v2.uploader
        .upload(image.tempFilePath)
        .then((result) => {
        return result;
    })
        .catch((error) => {
        (0, responder_1.abortIf)(error, http_status_1.default.BAD_REQUEST, 'Failed to upload');
        return { status: false };
    });
    return upload;
};
exports.cloudinaryUpload = cloudinaryUpload;
// module.exports = {
//   cloudinaryUpload,
// };
