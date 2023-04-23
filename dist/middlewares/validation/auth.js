"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const joi_1 = __importDefault(require("joi"));
exports.login = joi_1.default.object().keys({
    email: joi_1.default.string().required().min(10),
    password: joi_1.default.string().required().min(4).max(10)
});
