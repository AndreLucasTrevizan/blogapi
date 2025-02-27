"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const error_1 = require("./middleware/error");
const router_1 = __importDefault(require("./router"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(router_1.default);
app.use(error_1.errorMiddleware);
const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});
