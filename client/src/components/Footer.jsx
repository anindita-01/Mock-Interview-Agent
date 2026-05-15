import React from 'react'
import { BsRobot } from 'react-icons/bs'

function Footer() {
  return (
    <div className='flex justify-center px-4 pb-10 py-4 pt-8'>
      <div className='w-full max-w-6xl glass-panel rounded-lg py-8 px-5 text-center'>
        <div className='flex justify-center items-center gap-3 mb-3'>
            <div className='brand-gradient text-white p-2 rounded-lg shadow-md'><BsRobot size={16}/></div>
            <h2 className='font-bold tracking-tight'>HireIQ.ai</h2>
        </div>
        <p className='text-gray-500 text-sm max-w-xl mx-auto'>
          AI-powered interview preparation for sharper communication,
          stronger technical answers, and confident hiring conversations.
        </p>


      </div>
    </div>
  )
}

export default Footer
