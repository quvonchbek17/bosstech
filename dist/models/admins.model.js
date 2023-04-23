"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminsSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.Types.ObjectId,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String
    }
}, {
    collection: "admins"
});
exports.default = (0, mongoose_1.model)("Admins", adminsSchema);
