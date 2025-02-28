"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPosts = exports.createPost = void 0;
const prisma_1 = require("../../prisma");
const selectOptions = {
    id: true,
    title: true,
    body: true,
    createdAt: true,
    updatedAt: true,
};
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const body = req.body.body;
    if (!title || title == "") {
        throw new Error("Preencha o campo título");
    }
    if (!body || body == "") {
        throw new Error("Preencha o campo descrição");
    }
    yield prisma_1.prisma.post.create({
        data: {
            title,
            body,
            userId: req.user.id,
        },
    });
    res.json().end();
});
exports.createPost = createPost;
const listPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const page = (_a = req.query.page) !== null && _a !== void 0 ? _a : '1';
    const limit = (_b = req.query.limit) !== null && _b !== void 0 ? _b : '5';
    const postId = req.query.postId;
    const me = req.query.me;
    let posts = [];
    const postsCount = yield prisma_1.prisma.post.count();
    const postsPerPage = Number(limit);
    const amountOfPage = Math.ceil(postsCount / postsPerPage);
    if (postId && postId != "") {
        const post = yield prisma_1.prisma.post.findFirst({
            where: { id: Number(postId) },
            select: Object.assign(Object.assign({}, selectOptions), { user: {
                    select: {
                        id: true,
                        name: true,
                    }
                } }),
        });
        if (!post) {
            throw new Error("Post não encontrado");
        }
        res.json({ post }).end();
        return;
    }
    if (me) {
        posts = yield prisma_1.prisma.post.findMany({
            skip: (Number(page) - 1) * postsPerPage,
            take: postsPerPage,
            where: { userId: req.user.id, },
            select: Object.assign(Object.assign({}, selectOptions), { user: {
                    select: {
                        id: true,
                        name: true,
                    }
                } }),
            orderBy: {
                createdAt: 'desc'
            },
        });
        res.json({ posts }).end();
        return;
    }
    if (!postId &&
        !me) {
        posts = yield prisma_1.prisma.post.findMany({
            skip: (Number(page) - 1) * postsPerPage,
            take: postsPerPage,
            select: Object.assign(Object.assign({}, selectOptions), { user: {
                    select: {
                        id: true,
                        name: true,
                    }
                } }),
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    res.json({ posts, pages: amountOfPage, limit: postsPerPage }).end();
});
exports.listPosts = listPosts;
