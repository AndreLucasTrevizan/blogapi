"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const _1 = require(".");
const router = (0, express_1.Router)();
exports.PostRouter = router;
router
    .route('/posts')
    .get(auth_1.authMiddleware, _1.listPosts)
    .post(auth_1.authMiddleware, _1.createPost);
