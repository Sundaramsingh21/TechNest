import express from "express"
import { loginUser,OTPsender,registerUser } from "../controllers/usercontroller.js"

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/otp",OTPsender)

export default userRouter;