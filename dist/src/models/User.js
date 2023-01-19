"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// user schema
const UserSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    DOB: {
        type: String,
        required: true,
    },
    interests: [{ type: String }],
    active: {
        type: Boolean,
        default: false,
    },
    suspended: {
        type: Boolean,
        default: false,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    geoLocation: {
        type: String,
    },
    currency: {
        type: String,
    },
    street: {
        type: String,
    },
    profileUlr: {
        type: String,
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
});
// create and export user model
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
