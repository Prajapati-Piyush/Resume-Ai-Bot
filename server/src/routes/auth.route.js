import { Router } from "express"
import { register, login, logoutUser, getMe, forgotPassword, resetPassword } from "../controllers/auth.controller.js"
import authUser from "../middleware/auth.middleware.js"

const authRouter  = Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/logout", logoutUser)
authRouter.post("/forgot-password", forgotPassword)
authRouter.post("/reset-password", resetPassword)

authRouter.get('/get-me',authUser,getMe)
export default authRouter
