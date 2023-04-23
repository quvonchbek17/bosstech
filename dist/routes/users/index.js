"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../../controllers/users");
const validate_1 = __importDefault(require("../../middlewares/validation/validate"));
const users_2 = require("../../middlewares/validation/users");
const protect_1 = __importDefault(require("../../middlewares/auth/protect"));
const UsersRouter = (0, express_1.Router)();
UsersRouter
    .get("/", protect_1.default, users_1.Users.GetUsers)
    .get("/:id", (0, validate_1.default)(users_2.getUserById, "params"), users_1.Users.GetUserById)
    .post("/", (0, validate_1.default)(users_2.registerUser), users_1.Users.Register);
exports.default = UsersRouter;
