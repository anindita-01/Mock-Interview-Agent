import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import interviewRouter from "./routes/interview.route.js"
import paymentRouter from "./routes/payment.route.js"

const app = express()
app.set("trust proxy", 1)

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://hireiq-ai-r32h.onrender.com",
    process.env.CLIENT_URL,
    process.env.FRONTEND_URL,
    process.env.CLIENT_URLS,
]
    .filter(Boolean)
    .flatMap((origin) => origin.split(","))
    .map((origin) => origin.trim().replace(/\/$/, ""))

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
            return callback(null, true)
        }

        console.warn(`Blocked by CORS: ${origin}`)
        return callback(new Error("Not allowed by CORS"))
    },
    credentials:true,
    methods:["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders:["Content-Type", "Authorization"]
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth" , authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview" , interviewRouter)
app.use("/api/payment" , paymentRouter)

const PORT = process.env.PORT || 6000
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)
    connectDb()
})
