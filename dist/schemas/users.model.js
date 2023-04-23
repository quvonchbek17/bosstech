"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const usersSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.Types.ObjectId,
        require: true
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
}, {
    collection: "users"
});
exports.default = (0, mongoose_1.model)("Users", usersSchema);
