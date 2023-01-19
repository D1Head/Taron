"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
// const catchAsync = require('../utils/catchAsync');
const catchAsync_1 = require("../utils/catchAsync");
const user_service_1 = __importDefault(require("../services/user.service"));
const responder_1 = require("../utils/responder");
const typedi_1 = require("typedi");
// import { send_email } from '../utils/schedules.job';
// import console from 'console';
let LogsController = class LogsController {
    /**
     *
     */
    constructor(logService) {
        this.logService = logService;
        this.createLogsController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // await agenda;
            // send_email();
            return (0, responder_1.successResponse)(res, {});
        }));
        this.updateLogsController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const _update = yield this.logService.updateLogs(req.params.id, req.body);
            return (0, responder_1.successResponse)(res, _update);
        }));
        this.getAllLogsController = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const _getOneCustomer = yield this.logService.getLogs();
            return (0, responder_1.successResponse)(res, _getOneCustomer);
        }));
    }
};
LogsController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [user_service_1.default])
], LogsController);
exports.default = LogsController;
