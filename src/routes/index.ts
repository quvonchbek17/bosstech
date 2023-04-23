import { Router } from "express";
import UsersRouter from "./users";
import AuthRouter from "./auth";
import ProductsRouter from "./products";
import OrdersRouter from "./orders";
import FilesRouter from "./files";

const router = Router()

router.use("/auth", AuthRouter)
router.use("/users",UsersRouter)
router.use("/products",ProductsRouter)
router.use("/orders",OrdersRouter)
router.use("/files",FilesRouter)


export default router