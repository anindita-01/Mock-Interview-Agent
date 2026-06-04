import User from "../models/user.model.js"
import { authCookieName, verifyToken } from "../config/token.js"

const isAuth = async (req,res,next) => {
    try {
        const token = req.cookies?.[authCookieName]

        if (!token) {
            return res.status(401).json({ message: "Authentication required" })
        }

        const decoded = verifyToken(token)
        const user = await User.findById(decoded.userId)

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }

        req.userId = user._id
        req.user = user
        next()
    } catch (error) {
        console.error("isAuth error:", error)
        return res.status(401).json({message:"Invalid or expired authentication token"})
    }
}

export default isAuth
