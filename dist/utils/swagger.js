"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const express_1 = require("express");
const PORT = process.env.PORT || 3000;
console.log(`${process.cwd()}/src/swagger/docs/authdoc.yaml`);
const swRouter = (0, express_1.Router)();
const swagger = (0, swagger_jsdoc_1.default)({
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Bosstech",
            description: "Agar bu yerda ishlamasa iltimos postmanda sinab ko'ring ! Rahmat)"
        },
        components: {
            securitySchemes: {
                Token: {
                    type: "apiKey",
                    name: "token",
                    in: "header",
                    description: "authorization",
                }
            },
        },
    },
    apis: [
        `${process.cwd()}/src/swagger/docs/authdoc.yaml`,
        `${process.cwd()}/src/swagger/components/authcom.yaml`,
        `${process.cwd()}/src/swagger/docs/usersdoc.yaml`,
        `${process.cwd()}/src/swagger/components/userscom.yaml`
    ],
});
swRouter.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger));
exports.default = swRouter;
