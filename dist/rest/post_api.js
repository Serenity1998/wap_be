"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IPost_1 = __importDefault(require("../schemas/IPost"));
const post_router = (0, express_1.Router)();
post_router.post('/post', async (req, res) => {
    try {
        console.log(req.body);
        const post = new IPost_1.default(req.body);
        await post.save();
        res.status(201).send(post);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
post_router.get('/post', async (req, res) => {
    try {
        console.log(req.query.type);
        const startOfDay = new Date();
        if (req.query.type == 'yesterday')
            startOfDay.setDate(startOfDay.getDate() - 1);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        if (req.query.type == 'yesterday')
            endOfDay.setDate(endOfDay.getDate() - 2);
        startOfDay.setHours(0, 0, 0, 0);
        endOfDay.setHours(23, 59, 59, 999);
        const posts = await IPost_1.default.find({
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        }).sort({ createdAt: -1 });
        res.status(200).send(posts);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
post_router.get('/post/:id', async (req, res) => {
    try {
        const post = await IPost_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).send();
        }
        res.status(200).send(post);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
post_router.put('/post/up/:id', async (req, res) => {
    try {
        const post = await IPost_1.default.findById(req.params.id);
        const new_up = (post?.up || 0) + 1;
        const post_updated = await IPost_1.default.findByIdAndUpdate(req.params.id, { up: new_up });
        if (!post_updated) {
            return res.status(404).send();
        }
        res.status(200).send(post_updated);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
post_router.put('/post/down/:id', async (req, res) => {
    try {
        const post = await IPost_1.default.findById(req.params.id);
        const new_down = (post?.down || 0) + 1;
        const post_updated = await IPost_1.default.findByIdAndUpdate(req.params.id, { down: new_down });
        if (!post_updated) {
            return res.status(404).send();
        }
        res.status(200).send(post_updated);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.default = post_router;
