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
exports.Users = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
class Users {
    static GetUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json({
                success: true,
                data: yield users_model_1.default.find().sort({ created_at: -1 })
            });
        });
    }
    static GetUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.user;
            res.status(200).json({
                success: true,
                data: yield users_model_1.default.find({ id: req.params.id })
            });
        });
    }
    static Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, } = req.body;
            const user = new users_model_1.default({
                email, password, created_at: new Date(), updated_at: new Date()
            });
            user.save();
            res.status(200).json({
                success: true,
                data: user
            });
        });
    }
}
exports.Users = Users;
