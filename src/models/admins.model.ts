import { Schema, Types, model} from "mongoose";

const adminsSchema  = new Schema({
    id: {
        type: Types.ObjectId,
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
})

export default model("Admins", adminsSchema)