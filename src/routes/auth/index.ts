import { Router } from "express"
import { Auth } from "../../controllers/auth"
import validate from "../../middlewares/validation/validate"
import { login } from "../../middlewares/validation/auth"
const AuthRouter = Router()

AuthRouter
    .post("/admins/login", validate(login),  Auth.AdminLogin)
    .post("/users/login", validate(login),  Auth.UserLogin)
export default AuthRouter