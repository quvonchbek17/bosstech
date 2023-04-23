"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.getUserById = void 0;
const joi_1 = __importDefault(require("joi"));
exports.getUserById = joi_1.default.object().keys({
    id: joi_1.default.string().required()
});
exports.registerUser = joi_1.default.object().keys({
    email: joi_1.default.string().required().min(10),
    password: joi_1.default.string().required().min(4).max(10)
});
// export const updateNews = Joi.object().keys({
//   id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
//   title: Joi.string(),
//   desc: Joi.string(),
//   imgUrl: Joi.string()
// });
// export const deleteNews = Joi.object().keys({
//     id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
// });
