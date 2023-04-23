import { Router } from "express"
import { Users } from "../../controllers/users"
import validate from "../../middlewares/validation/validate"
import { deleteUser, getUserById, postUser, updateUser } from "../../middlewares/validation/users"
import protect from "../../middlewares/auth/protect"
const UsersRouter = Router()

UsersRouter
    .get("/", protect, Users.GetUsers)
    .get("/:id", protect, validate(getUserById, "params"), Users.GetUserById)
    .post("/register", protect, validate(postUser), Users.Post)
    .patch("/", protect, validate(updateUser), Users.Update)
    .delete("/:id", protect, validate(deleteUser, "params"), Users.Delete)

export default UsersRouter