import User from "../models/user.model.js"
import { authCookieName, genToken, getAuthCookieOptions } from "../config/token.js"
import bcrypt from "bcryptjs"

const normalizeEmail = (email = "") => email.trim().toLowerCase()
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const isValidPassword = (password) => typeof password === "string" && password.length >= 8

const setAuthCookie = (res, userId) => {
    const token = genToken(userId)
    res.cookie(authCookieName, token, getAuthCookieOptions())
}

export const register = async (req, res) => {
    try {
        const name = req.body.name?.trim()
        const email = normalizeEmail(req.body.email)
        const password = req.body.password

        if (!name || name.length < 2) {
            return res.status(400).json({ message: "Name must be at least 2 characters" })
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Enter a valid email address" })
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({ message: "Password must be at least 8 characters" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json({ message: "An account with this email already exists" })
        }

        const passwordHash = await bcrypt.hash(password, 12)
        const user = await User.create({
            name,
            email,
            passwordHash
        })

        setAuthCookie(res, user._id)
        user.passwordHash = undefined
        return res.status(201).json(user)
    } catch (error) {
        console.error("register error:", error)
        return res.status(500).json({ message: `Registration failed ${error}` })
    }
}

export const login = async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email)
        const password = req.body.password

        if (!isValidEmail(email) || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        const user = await User.findOne({ email }).select("+passwordHash")

        if (!user || !user.passwordHash) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const passwordMatches = await bcrypt.compare(password, user.passwordHash)

        if (!passwordMatches) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        setAuthCookie(res, user._id)
        user.passwordHash = undefined
        return res.status(200).json(user)
    } catch (error) {
        console.error("login error:", error)
        return res.status(500).json({ message: `Login failed ${error}` })
    }
}

export const logOut = async (req, res) => {
    res.clearCookie(authCookieName, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    })

    return res.status(200).json({ message: "Logged out successfully" })
}

export const getCurrentUser = async (req, res) => {
    try {
        const user = req.user || await User.findById(req.userId)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `Failed to get current user ${error}` })
    }
}
