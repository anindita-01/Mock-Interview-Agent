import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion as Motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Auth({isModel = false}) {
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth,provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google" , {name , email} , {withCredentials:true})
            dispatch(setUserData(result.data))
            


            
        } catch (error) {
            console.log(error)
              dispatch(setUserData(null))
        }
    }
  return (
    <div className={`
      w-full 
      ${isModel ? "py-4" : "min-h-screen app-shell flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20"}
    `}>
        <Motion.div 
        initial={{opacity:0 , y:-40}} 
        animate={{opacity:1 , y:0}} 
        transition={{duration:1.05}}
        className={`
        w-full 
        ${isModel ? "max-w-md p-6 sm:p-8 rounded-lg" : "max-w-lg p-8 sm:p-12 rounded-lg"}
        glass-panel
      `}>
            <div className='flex items-center justify-center gap-3 mb-6'>
                <div className='brand-gradient text-white p-2 rounded-lg shadow-md'>
                    <BsRobot size={18}/>

                </div>
                <h2 className='font-bold text-lg tracking-tight'>HireIQ.ai</h2>
            </div>

            <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
                Continue with
                <span className='ml-2 bg-yellow-100 text-pink-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
                    <IoSparkles size={16}/>
                    HireIQ.ai

                </span>
            </h1>

            <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
                Sign in to start realistic AI mock interviews, track your progress,
                and unlock detailed performance insights.
            </p>


            <Motion.button 
            onClick={handleGoogleAuth}
            whileHover={{opacity:0.9 , scale:1.03}}
            whileTap={{opacity:1 , scale:0.98}}
            className='w-full flex items-center justify-center gap-3 py-3 brand-gradient text-white rounded-full shadow-md font-semibold hover:shadow-lg transition'>
                <FcGoogle size={20}/>
                Continue with Google

   
            </Motion.button>
        </Motion.div>

      
    </div>
  )
}

export default Auth

