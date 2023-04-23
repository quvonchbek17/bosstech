import { Router } from "express"
import { Orders } from "../../controllers/orders"
import validate from "../../middlewares/validation/validate"
import { deleteOrder, getOrderById, postOrder, updateOrder } from "../../middlewares/validation/orders"
import protect from "../../middlewares/auth/protect"
const OrdersRouter = Router()

OrdersRouter
    .get("/", protect, Orders.GetOrders)
    .get("/createdat", protect, Orders.GetOrdersSortCreatedAt)
    .get("/count", protect, Orders.GetOrdersSortCount)
    .get("/:id", validate(getOrderById, "params"), Orders.GetOrderById)
    .post("/", protect, validate(postOrder), Orders.Post)
    .patch("/", protect, validate(updateOrder), Orders.Update)
    .delete("/:id", protect, validate(deleteOrder, "params"), Orders.Delete)

export default OrdersRouter