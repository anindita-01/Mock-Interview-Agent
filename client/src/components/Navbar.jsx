import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion as Motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';
import axios from 'axios';
import { ServerUrl } from '../config/api';
function Navbar() {
    const {userData} = useSelector((state)=>state.user)
    const [showCreditPopup,setShowCreditPopup] = useState(false)
    const [showUserPopup,setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.post(ServerUrl + "/api/auth/logout")
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='flex justify-center px-4 pt-4 sm:pt-6'>
        <Motion.div 
        initial={{opacity:0 , y:-40}}
        animate={{opacity:1 , y:0}}
        transition={{duration: 0.3}}
        className='glass-panel w-full max-w-6xl rounded-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex justify-between items-center relative'>
            <div onClick={()=>navigate("/")} className='flex items-center gap-3 cursor-pointer min-w-0'>
                <div className='brand-gradient text-white p-2 rounded-lg shadow-md shrink-0'>
                    <BsRobot size={18}/>

                </div>
                <h1 className='font-bold text-base sm:text-lg tracking-tight truncate'>HireIQ.ai</h1>
            </div>

            <div className='flex items-center gap-3 sm:gap-5 relative'>
                <div className='relative'>
                    <button onClick={()=>{
                        if(!userData){
                            setShowAuth(true)
                            return;
                        }
                        setShowCreditPopup(!showCreditPopup);
                        setShowUserPopup(false)
                    }} className='flex items-center gap-2 bg-white/80 border border-pink-100 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base hover:border-pink-200 hover:shadow-md transition'>
                        <BsCoin size={20}/>
                        {userData?.credits || 0}
                    </button>

                    {showCreditPopup && (
                        <div className='absolute right-[-70px] sm:right-[-50px] mt-3 w-64 max-w-[calc(100vw-2rem)] premium-card shadow-xl rounded-lg p-5 z-50'>
                            <p className='text-sm text-gray-600 mb-4'>Need more credits to continue interviews?</p>
                            <button onClick={()=>navigate("/pricing")} className='w-full brand-gradient text-white py-2 rounded-lg text-sm font-semibold shadow-md hover:opacity-95 transition'>Buy credits</button>

                        </div>
                    )}
                </div>

                <div className='relative'>
                    <button
                    onClick={()=>{
                         if(!userData){
                            setShowAuth(true)
                            return;
                        }
                        setShowUserPopup(!showUserPopup);
                        setShowCreditPopup(false)
                    }} className='w-9 h-9 brand-gradient text-white rounded-full flex items-center justify-center font-semibold shadow-md'>
                        {userData ? userData?.name.slice(0,1).toUpperCase() : <FaUserAstronaut size={16}/>}
                        
                    </button>

                    {showUserPopup && (
                        <div className='absolute right-0 mt-3 w-48 premium-card shadow-xl rounded-lg p-4 z-50'>
                            <p className='text-md brand-text-gradient font-semibold mb-1'>{userData?.name}</p>

                            <button onClick={()=>navigate("/history")} className='w-full text-left text-sm py-2 hover:text-pink-600 text-gray-600 transition'>Interview History</button>
                            <button onClick={handleLogout} 
                            className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500'>
                                <HiOutlineLogout size={16}/>
                                Logout</button>
                        </div>
                    )}
                </div>

            </div>



        </Motion.div>

        {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
      
    </div>
  )
}

export default Navbar


