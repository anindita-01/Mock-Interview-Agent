import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion as Motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';


function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()
  return (
    <div className='min-h-screen app-shell flex flex-col'>
      <Navbar />

      <div className='flex-1 px-4 sm:px-6 py-10 sm:py-14'>
        <div className='max-w-6xl mx-auto'>

          <div className='flex justify-center mb-6'>
            <div className='glass-panel text-gray-700 text-xs sm:text-sm px-4 py-2 rounded-full flex items-center gap-2'>
              <HiSparkles size={16} className="text-pink-500" />
              AI-powered interview intelligence for modern hiring
            </div>


          </div>
          <div className='text-center mb-14 sm:mb-20'>
            <Motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto tracking-tight'>
              Practice interviews with
              <span className='relative inline-block mt-2 sm:mt-0 sm:ml-3'>
                <span className='brand-gradient text-white px-5 py-1 rounded-full shadow-lg'>
                  HireIQ.ai

                </span>
              </span>



            </Motion.h1>

            <Motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className='text-gray-600 mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed'>
              Role-based mock interviews with adaptive questions, voice-led follow-ups,
              and clear performance insights that help you improve faster.

            </Motion.p>

            <div className='flex flex-col sm:flex-row justify-center gap-4 mt-10 max-w-md sm:max-w-none mx-auto'>
              <Motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/interview")
                }}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className='brand-gradient text-white px-8 sm:px-10 py-3 rounded-full hover:shadow-lg transition shadow-md font-semibold'>
                Start AI Interview

              </Motion.button>

              <Motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/history")
                }}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className='border border-pink-100 bg-white/80 px-8 sm:px-10 py-3 rounded-full hover:border-pink-200 hover:shadow-md transition font-semibold text-gray-700'>
                View Reports

              </Motion.button>
            </div>
          </div>

          <div className='grid md:grid-cols-3 gap-6 lg:gap-8 mb-24 sm:mb-28'>
            {
              [
                {
                  icon: <BsRobot size={24} />,
                  step: "STEP 1",
                  title: "Role & Experience Selection",
                  desc: "HireIQ.ai tunes every session to your target role and experience level."
                },
                {
                  icon: <BsMic size={24} />,
                  step: "STEP 2",
                  title: "Smart Voice Interview",
                  desc: "Natural voice prompts and adaptive follow-ups keep the practice realistic."
                },
                {
                  icon: <BsClock size={24} />,
                  step: "STEP 3",
                  title: "Timer Based Simulation",
                  desc: "Time-boxed questions help you build calm, concise interview responses."
                }
              ].map((item, index) => (
                <Motion.div key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 + index * 0.2 }}
                  whileHover={{ rotate: 0, scale: 1.06 }}

                  className='relative premium-card premium-card-hover rounded-lg p-7 sm:p-8 pt-12 w-full shadow-md'>

                  <div className='absolute -top-7 left-1/2 -translate-x-1/2 brand-gradient text-white w-14 h-14 rounded-lg flex items-center justify-center shadow-lg'>
                    {item.icon}</div>
                  <div className='pt-10 text-center'>
                    <div className='text-xs text-pink-600 font-bold mb-2 tracking-wider'>{item.step}</div>
                    <h3 className='font-semibold mb-3 text-lg'>{item.title}</h3>
                    <p className='text-sm text-gray-500 leading-relaxed'>{item.desc}</p>
                  </div>


                </Motion.div>
              ))
            }
          </div>


          <div className='mb-24 sm:mb-32'>
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 tracking-tight'>
              Advanced AI{" "}
              <span className="brand-text-gradient">Capabilities</span>

            </Motion.h2>

            <div className='grid md:grid-cols-2 gap-10'>
              {
                [
                  {
                    image: evalImg,
                    icon: <BsBarChart size={20} />,
                    title: "AI Answer Evaluation",
                    desc: "Scores communication, technical accuracy, confidence, and response quality."
                  },
                  {
                    image: resumeImg,
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Resume Based Interview",
                    desc: "Generates project-aware questions from your uploaded resume."
                  },
                  {
                    image: pdfImg,
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Downloadable PDF Report",
                    desc: "Exports strengths, gaps, and focused improvement guidance."
                  },
                  {
                    image: analyticsImg,
                    icon: <BsBarChart size={20} />,
                    title: "History & Analytics",
                    desc: "Track progress with performance graphs and interview history."
                  }
                ].map((item, index) => (
                  <Motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className='premium-card premium-card-hover rounded-lg p-6 sm:p-8'>
                    <div className='flex flex-col md:flex-row items-center gap-6 sm:gap-8'>
                      <div className='w-full md:w-1/2 flex justify-center bg-gradient-to-br from-yellow-50 to-pink-50 rounded-lg p-4'>
                        <img src={item.image} alt={item.title} className='w-full h-auto object-contain max-h-64' />
                      </div>

                      <div className='w-full md:w-1/2'>
                        <div className='bg-yellow-100 text-pink-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6'>
                          {item.icon}
                        </div>
                        <h3 className='font-semibold mb-3 text-xl'>{item.title}</h3>
                        <p className='text-gray-500 text-sm leading-relaxed'>{item.desc}</p>
                      </div>

                    </div>


                  </Motion.div>
                ))
              }
            </div>


          </div>

          <div className='mb-24 sm:mb-32'>
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 tracking-tight'>
              Multiple Interview{" "}
              <span className="brand-text-gradient">Modes</span>

            </Motion.h2>

            <div className='grid md:grid-cols-2 gap-10'>
              {
                [
                  {
                    img: hrImg,
                    title: "HR Interview Mode",
                    desc: "Behavioral, communication, and professional readiness evaluation."
                  },
                  {
                    img: techImg,
                    title: "Technical Mode",
                    desc: "Deeper role-specific questioning for technical interview prep."
                  },

                  {
                    img: confidenceImg,
                    title: "Confidence Detection",
                    desc: "Tone and voice-based signals to sharpen delivery."
                  },
                  {
                    img: creditImg,
                    title: "Credits System",
                    desc: "Flexible credits for deeper practice and more reports."
                  }
                ].map((mode, index) => (
                  <Motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="premium-card premium-card-hover rounded-lg p-6 sm:p-8">

                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6'>
                      <div className="w-full sm:w-1/2">
                        <h3 className="font-semibold text-xl mb-3">
                          {mode.title}
                        </h3>

                        <p className="text-gray-500 text-sm leading-relaxed">
                          {mode.desc}
                        </p>
                      </div>

                      {/* RIGHT IMAGE */}
                      <div className="w-full sm:w-1/2 flex justify-center sm:justify-end bg-gradient-to-br from-yellow-50 to-pink-50 rounded-lg p-4">
                        <img
                          src={mode.img}
                          alt={mode.title}
                          className="w-28 h-28 object-contain"
                        />
                      </div>



                    </div>


                  </Motion.div>
                ))
              }
            </div>


          </div>

        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

        <Footer/>

    </div>
  )
}

export default Home

