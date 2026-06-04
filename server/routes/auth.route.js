import express from "express"
import rateLimit from "express-rate-limit"
import {
    getCurrentUser,
    login,
    logOut,
    register
} from "../controllers/auth.controller.js"
import isAuth from "../middlewares/isAuth.js"

const authRouter = express.Router()

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many authentication attempts. Please try again later." }
})

authRouter.post("/register", authLimiter, register)
authRouter.post("/login", authLimiter, login)
authRouter.get("/current-user", isAuth, getCurrentUser)
authRouter.post("/logout", logOut)


export default authRouter
