"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongo = mongoose_1.default
    .connect(`mongodb+srv://taron:${process.env.DB_PASSWORD}@cluster0.wuycowd.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((con) => console.log('DB connection successful !'));
exports.default = { mongo };
