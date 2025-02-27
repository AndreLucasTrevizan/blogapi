"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const _1 = require(".");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
exports.UserRouter = router;
router
    .route('/users')
    .post(_1.createUser);
router
    .route('/users/details')
    .get(auth_1.authMiddleware, _1.getUserDetails);
router
    .route('/sign_in')
    .post(_1.userSignIn);
