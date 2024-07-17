"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_api_1 = __importDefault(require("./rest/user_api"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const post_api_1 = __importDefault(require("./rest/post_api"));
var cors = require('cors');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const corsOptions = {
    origin: 'http://localhost:3000', // your frontend's origin
    credentials: true, // allow credentials
};
app.use(cors(corsOptions));
app.use(body_parser_1.default.json());
app.use('/api', user_api_1.default);
app.use('/api', post_api_1.default);
mongoose_1.default
    .connect(process.env.ATLAS_URI)
    .then(() => {
    console.log('Connected to MongoDB Atlas');
    // app.use('/api', user_router);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to MongoDB Atlas', error);
});
