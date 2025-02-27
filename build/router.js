"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router_1 = require("./modules/users/router");
const router_2 = require("./modules/posts/router");
const router_3 = require("./modules/comments/router");
const router = (0, express_1.Router)();
router.get("/errors", (req, res) => {
    throw new Error("Error test");
});
router.use(router_1.UserRouter);
router.use(router_2.PostRouter);
router.use(router_3.CommentsRouter);
exports.default = router;
