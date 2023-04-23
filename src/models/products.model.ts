import { Schema, Types, model} from "mongoose";

const productsSchema  = new Schema({
    id: {
        type: Types.ObjectId,
        require: true
    },
    name: {
        type: String
    },
    price: {
       type: String
    },
    desc: {
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
    collection: "products"
})

export default model("Products", productsSchema)