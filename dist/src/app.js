"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("./utils/ApiError"));
const cors_1 = __importDefault(require("cors"));
// import { agenda } from './utils/schedules.job';
const mongoose = require('mongoose');
const app = (0, express_1.default)();
const routes_1 = require("./routes");
const error_1 = require("./middleware/error");
const db_1 = __importDefault(require("./db"));
//mondodb connection
db_1.default.mongo;
// agenda queueing
// agenda;
app.use((0, express_fileupload_1.default)({ useTempFiles: true, tempFileDir: '/tmp/' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1/auth', routes_1.authRoutes);
app.use((req, res, next) => {
    next(new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Not found'));
});
app.use(error_1.errorConverter);
app.use(error_1.errorHandler);
exports.default = app;
// app.listen(3004, () => console.log(`Listening on: 3004`));
//module.exports.handler = serverless(app);
//"include": ["src/**/*"]
