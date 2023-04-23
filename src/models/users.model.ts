import { string } from "joi";
import { Schema, Types, model} from "mongoose";

const usersSchema  = new Schema({
    id: {
        type: Types.ObjectId,
        require: true
    },
    name: {
        type: String
    },
    email: {
       type: String,
       require: true
    },
    password: {
        type: String
    },
    files: [
        {
            type: Types.ObjectId,
            ref: "Files"
        }
    ],
    orders: [
        {
            type: Types.ObjectId,
            ref: "Orders"
        }
    ],
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
}, {
    collection: "users"
})

export default model("Users", usersSchema)