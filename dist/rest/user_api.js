"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IUser_1 = __importDefault(require("../schemas/IUser"));
const user_router = (0, express_1.Router)();
user_router.post('/user', async (req, res) => {
    try {
        const user = new IUser_1.default(req.body);
        await user.save();
        console.log(user);
        res.status(201).send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
user_router.get('/user', async (req, res) => {
    try {
        const users = await IUser_1.default.find();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
user_router.get('/user/:id', async (req, res) => {
    try {
        const user = await IUser_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
user_router.put('/user/:id', async (req, res) => {
    try {
        const user = await IUser_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
user_router.delete('/user/:id', async (req, res) => {
    try {
        const user = await IUser_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.default = user_router;
