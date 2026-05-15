import jwt from "jsonwebtoken"


const isAuth = async (req,res,next) => {
    try {
        let {token} = req.cookies

        if(!token){
            return res.status(401).json({message:"user does not have a token"})
        }
        const verifyToken = jwt.verify(token , process.env.JWT_SECRET)
        
        if(!verifyToken){
            return res.status(401).json({message:"user does not have a valid token"})
        }
        req.userId = verifyToken.userId

        next()
   

    } catch (error) {
        console.error("isAuth error:", error)
        return res.status(401).json({message:"Invalid or expired authentication token"})
    }
    
}

export default isAuth
