"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
require("reflect-metadata");
const express_1 = require("express");
// const { signUpValidate } = require("../validations/user.validations");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const typedi_1 = require("typedi");
// import { agenda } from '../utils/schedules.job';
const router = (0, express_1.Router)();
exports.router = router;
const controller = typedi_1.Container.get(user_controller_1.default);
// ts-node-dev --respawn --pretty --transpile-only
