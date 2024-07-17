"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    icon_code: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)('User', exports.userSchema);
exports.default = User;
