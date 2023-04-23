import { Router } from "express"
import { Products } from "../../controllers/products"
import validate from "../../middlewares/validation/validate"
import { deleteProduct, getProductById, postProduct, updateProduct } from "../../middlewares/validation/products"
import protect from "../../middlewares/auth/protect"
const ProductsRouter = Router()

ProductsRouter
    .get("/", protect, Products.GetProducts)
    .get("/name", protect, Products.GetOrdersSortName)
    .get("/price", protect, Products.GetOrdersSortPrice)
    .get("/pricedesc", protect, Products.GetOrdersSortPriceDesc)
    .get("/:id", protect, validate(getProductById, "params"), Products.GetProductById)
    .post("/", protect,  validate(postProduct), Products.Post)
    .patch("/", protect,  validate(updateProduct), Products.Update)
    .delete("/:id", protect, validate(deleteProduct, "params"), Products.Delete)

export default ProductsRouter