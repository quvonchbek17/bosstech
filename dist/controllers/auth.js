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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const admins_model_1 = __importDefault(require("../models/admins.model"));
const jwt_1 = require("../utils/jwt");
class Auth {
    static Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, } = req.body;
            const admin = yield admins_model_1.default.find({ email, password });
            if (admin) {
                res.status(200).json({
                    success: true,
                    token: yield jwt_1.Jwt.generateToken(email)
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Email yoki parol xato !"
                });
            }
        });
    }
}
exports.Auth = Auth;
