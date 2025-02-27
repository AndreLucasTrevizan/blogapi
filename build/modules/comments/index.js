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
exports.listComments = exports.createComment = void 0;
const prisma_1 = require("../../prisma");
const selectOptions = {
    id: true,
    body: true,
    user: {
        select: {
            id: true,
            name: true,
        },
    },
    createdAt: true,
    updatedAt: true,
};
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body.body;
    const postId = req.body.postId;
    if (!body || body == "") {
        throw new Error("Preencha o campo body");
    }
    if (!postId || postId == "") {
        throw new Error("Preencha o campo postId");
    }
    const post = yield prisma_1.prisma.post.findFirst({
        where: { id: Number(postId) }
    });
    if (!post) {
        throw new Error("Post invalido ou não existe");
    }
    yield prisma_1.prisma.comment.create({
        data: {
            body,
            userId: req.user.id,
            postId: post.id,
        },
    });
    res.json().end();
});
exports.createComment = createComment;
const listComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    if (!postId) {
        throw new Error("Precisamos que informe o ID do Post");
    }
    const post = yield prisma_1.prisma.post.findFirst({
        where: { id: Number(postId) }
    });
    if (!post) {
        throw new Error("Post invalido");
    }
    const comments = yield prisma_1.prisma.comment.findMany({
        where: { postId: post.id, },
        select: selectOptions,
        orderBy: {
            createdAt: 'desc'
        }
    });
    res.json({ comments });
});
exports.listComments = listComments;
