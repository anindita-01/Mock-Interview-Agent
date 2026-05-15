import genToken from "../config/token.js"
import User from "../models/user.model.js"

const isProduction = process.env.NODE_ENV === "production"

const authCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
}


export const googleAuth = async (req,res) => {
    try {
        const {name , email} = req.body
        if (!name || !email) {
            return res.status(400).json({message:"Name and email are required"})
        }

        let user = await User.findOne({email})
        if(!user){
            user = await User.create({
                name , 
                email
            })
        }
        let token = await genToken(user._id)
        res.cookie("token" , token , authCookieOptions)

        return res.status(200).json(user)



    } catch (error) {
        console.error("Google auth error:", error)
        return res.status(500).json({message:`Google auth error ${error}`})
    }
    
}

export const logOut = async (req,res) => {
    try {
        res.clearCookie("token", {
            httpOnly: authCookieOptions.httpOnly,
            secure: authCookieOptions.secure,
            sameSite: authCookieOptions.sameSite
        })
        return res.status(200).json({message:"LogOut Successfully"})
    } catch (error) {
         console.error("Logout error:", error)
         return res.status(500).json({message:`Logout error ${error}`})
    }
    
}
