"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const has_token = req.headers['authorization'];
    if (!has_token) {
        res.status(403).json({ msg: "Não autenticado" });
        return;
    }
    const token = has_token.split(' ')[1];
    (0, jsonwebtoken_1.verify)(token, String(process.env.API_SECRET), (err, decoded) => {
        if (err) {
            res.status(401).json({ msg: "Token inválido" });
            return;
        }
        req.user = decoded;
        next();
    });
};
exports.authMiddleware = authMiddleware;
