"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const validate_1 = __importDefault(require("../../middlewares/validation/validate"));
const auth_2 = require("../../middlewares/validation/auth");
const AuthRouter = (0, express_1.Router)();
AuthRouter
    .post("/login", (0, validate_1.default)(auth_2.login), auth_1.Auth.Login);
exports.default = AuthRouter;
