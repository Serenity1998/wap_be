"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const IUser_1 = require("./IUser");
const postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: false,
    },
    user: {
        type: IUser_1.userSchema,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    up: {
        type: Number,
        required: true,
    },
    down: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
const Post = (0, mongoose_1.model)('Post', postSchema);
exports.default = Post;
