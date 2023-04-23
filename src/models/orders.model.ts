import { string } from "joi";
import { Schema, Types, model} from "mongoose";

const orderSchema  = new Schema({
    id: {
        type: Types.ObjectId,
        require: true
    },
    count: {
        type: Number
    },
    user: {
       type: Schema.Types.ObjectId,
       ref: "Users",
       require: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        require: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
}, {
    collection: "orders"
})

export default model("Orders", orderSchema)