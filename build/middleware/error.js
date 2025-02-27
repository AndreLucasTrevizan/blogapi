"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof Error) {
        res.status(400).json({ msg: err.message });
        return;
    }
    res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
};
exports.errorMiddleware = errorMiddleware;
