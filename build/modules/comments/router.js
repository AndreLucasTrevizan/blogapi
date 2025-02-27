"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const _1 = require(".");
const router = (0, express_1.Router)();
exports.CommentsRouter = router;
router
    .route('/comments')
    .post(auth_1.authMiddleware, _1.createComment);
router
    .route('/comments/:postId')
    .get(auth_1.authMiddleware, _1.listComments);
