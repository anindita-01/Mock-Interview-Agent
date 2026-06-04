import React, { useState } from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { motion as Motion } from "motion/react"
import axios from 'axios';
import { ServerUrl } from '../config/api';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

function Auth({ isModel = false, initialMode = "login" }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [mode, setMode] = useState(initialMode)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const isRegister = mode === "register"

    const updateField = (field, value) => {
        setFormData((current) => ({ ...current, [field]: value }))
        setError("")
    }

    const validate = () => {
        const email = formData.email.trim()

        if (isRegister && formData.name.trim().length < 2) {
            return "Name must be at least 2 characters."
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Enter a valid email address."
        }

        if (formData.password.length < 8) {
            return "Password must be at least 8 characters."
        }

        return ""
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")

        const validationError = validate()
        if (validationError) {
            setError(validationError)
            return
        }

        try {
            setLoading(true)
            const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login"
            const payload = isRegister
                ? {
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    password: formData.password
                }
                : {
                    email: formData.email.trim(),
                    password: formData.password
                }

            const result = await axios.post(ServerUrl + endpoint, payload)
            dispatch(setUserData(result.data))

            if (!isModel) {
                navigate(location.state?.from?.pathname || "/")
            }
        } catch (error) {
            setError(error?.response?.data?.message || "Authentication failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const switchMode = (nextMode) => {
        setMode(nextMode)
        setError("")
    }

    return (
        <div className={`
      w-full 
      ${isModel ? "py-4" : "min-h-screen app-shell flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20"}
    `}>
            <Motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.05 }}
                className={`
        w-full 
        ${isModel ? "max-w-md p-6 sm:p-8 rounded-lg" : "max-w-lg p-8 sm:p-12 rounded-lg"}
        glass-panel
      `}>
                <div className='flex items-center justify-center gap-3 mb-6'>
                    <div className='brand-gradient text-white p-2 rounded-lg shadow-md'>
                        <BsRobot size={18} />
                    </div>
                    <h2 className='font-bold text-lg tracking-tight'>HireIQ.ai</h2>
                </div>

                <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
                    {isRegister ? "Create your" : "Welcome back to"}
                    <span className='ml-2 bg-yellow-100 text-pink-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
                        <IoSparkles size={16} />
                        HireIQ.ai
                    </span>
                </h1>

                <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-7'>
                    {isRegister
                        ? "Create an account to start interviews, save reports, and track progress."
                        : "Sign in to continue realistic AI mock interviews and performance insights."}
                </p>

                <div className='grid grid-cols-2 gap-2 bg-white/75 border border-pink-100 p-1 rounded-full mb-6'>
                    <button
                        type='button'
                        onClick={() => switchMode("login")}
                        className={`py-2 rounded-full text-sm font-semibold transition ${!isRegister ? "brand-gradient text-white shadow" : "text-gray-600"}`}>
                        Login
                    </button>
                    <button
                        type='button'
                        onClick={() => switchMode("register")}
                        className={`py-2 rounded-full text-sm font-semibold transition ${isRegister ? "brand-gradient text-white shadow" : "text-gray-600"}`}>
                        Register
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    {isRegister && (
                        <div className='relative'>
                            <MdPerson className='absolute top-4 left-4 text-gray-400' size={18} />
                            <input
                                type='text'
                                value={formData.name}
                                onChange={(event) => updateField("name", event.target.value)}
                                placeholder='Full name'
                                className='focus-brand w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg outline-none transition bg-white/90'
                            />
                        </div>
                    )}

                    <div className='relative'>
                        <MdEmail className='absolute top-4 left-4 text-gray-400' size={18} />
                        <input
                            type='email'
                            value={formData.email}
                            onChange={(event) => updateField("email", event.target.value)}
                            placeholder='you@example.com'
                            className='focus-brand w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg outline-none transition bg-white/90'
                        />
                    </div>

                    <div className='relative'>
                        <MdLock className='absolute top-4 left-4 text-gray-400' size={18} />
                        <input
                            type='password'
                            value={formData.password}
                            onChange={(event) => updateField("password", event.target.value)}
                            placeholder='Password'
                            className='focus-brand w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg outline-none transition bg-white/90'
                        />
                    </div>

                    <Motion.button
                        type='submit'
                        disabled={loading}
                        whileHover={{ opacity: 0.9, scale: 1.03 }}
                        whileTap={{ opacity: 1, scale: 0.98 }}
                        className='w-full disabled:opacity-70 py-3 brand-gradient text-white rounded-full shadow-md font-semibold hover:shadow-lg transition'>
                        {loading ? (isRegister ? "Creating account..." : "Signing in...") : (isRegister ? "Create Account" : "Login")}
                    </Motion.button>
                </form>

                {error && (
                    <div className='mt-5 rounded-lg px-4 py-3 text-sm bg-red-50 text-red-600 border border-red-100'>
                        {error}
                    </div>
                )}
            </Motion.div>
        </div>
    )
}

export default Auth
