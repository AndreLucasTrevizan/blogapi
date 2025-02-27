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
exports.getUserDetails = exports.userSignIn = exports.createUser = void 0;
const prisma_1 = require("../../prisma");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const selectOptions = {
    id: true,
    name: true,
    email: true,
    createdAt: true,
    updatedAt: true,
};
const getUserByEmail = (pUserEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findFirst({
        where: { email: pUserEmail }
    });
    return user;
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (!name || name == "") {
        throw new Error("Preencha o campo nome");
    }
    if (!email || email == "") {
        throw new Error("Preencha o campo nome");
    }
    if (!email.includes('@')) {
        throw new Error("Insira um e-mail válido");
    }
    if (!password || password == "") {
        throw new Error("Preencha o campo nome");
    }
    const userWithDuplicateEmail = yield getUserByEmail(email);
    if (userWithDuplicateEmail) {
        throw new Error("E-mail já está sendo usado");
    }
    const hashedPassword = yield (0, bcryptjs_1.hash)(password, 8);
    yield prisma_1.prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });
    res.json().end();
});
exports.createUser = createUser;
const userSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || email == "") {
        throw new Error("Preencha o campo e-mail");
    }
    if (!email.includes('@')) {
        throw new Error("Insira um e-mail válido");
    }
    if (!password || password == "") {
        throw new Error("Preencha o campo senha");
    }
    const userByEmail = yield getUserByEmail(email);
    if (!userByEmail) {
        throw new Error("E-mail ou senha inválidos");
    }
    const matchedPassword = yield (0, bcryptjs_1.compare)(password, userByEmail.password);
    if (!matchedPassword) {
        throw new Error("E-mail ou senha inválidos");
    }
    const token = (0, jsonwebtoken_1.sign)({
        id: userByEmail.id,
    }, String(process.env.API_SECRET));
    res.json({ token });
});
exports.userSignIn = userSignIn;
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findFirst({
        where: { id: req.user.id },
        select: selectOptions,
    });
    res.json({ user });
});
exports.getUserDetails = getUserDetails;
