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
exports.emailSender = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const key_1 = require("../../key");
const schedules_job_1 = require("./schedules.job");
const { email_password, sender_email } = key_1.values;
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: sender_email,
        pass: email_password,
    },
});
const emailSender = (email, subject, html, attachments = null, property_id) => __awaiter(void 0, void 0, void 0, function* () {
    let bool;
    try {
        console.log('About to send Email', email);
        let mailOptions = {
            from: sender_email,
            to: email,
            subject: subject,
            attachments,
            html,
        };
        yield transporter.verify((err, success) => {
            if (err) {
                bool = false;
            }
        });
        yield transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error ' + err);
                bool = false;
            }
            else {
                bool = true;
                console.log('Email sent successfully', bool);
                (0, schedules_job_1.update_job)(property_id);
                // return bool;
            }
        });
        console.log(bool);
        return bool;
    }
    catch (err) {
        console.error(err);
    }
});
exports.emailSender = emailSender;
