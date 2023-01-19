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
exports.compare_passwords = exports.hash = exports.generate_random_password = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()><?/"][}{|+=-_`~:;';
const generate_random_password = (number = 8) => {
    let result = '';
    const charactersLength = characters.length;
    for (var i = 0; i < number; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generate_random_password = generate_random_password;
const hash = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSaltSync(10);
    const hashed_password = yield bcryptjs_1.default.hashSync(text, salt);
    return hashed_password;
});
exports.hash = hash;
const compare_passwords = (incoming_password, password_on_db) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield bcryptjs_1.default.compare(incoming_password, password_on_db);
    return check;
});
exports.compare_passwords = compare_passwords;
