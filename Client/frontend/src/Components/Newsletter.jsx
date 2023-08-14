import { Send } from '@mui/icons-material'
import React from 'react'

function Newsletter() {
         return (
        <div className='h-[60vh] flex items-center flex-col justify-center bg-gray-100'>
          <h1 className='text-5xl mb-6'>NEWSLETTER</h1>
          <p className='text-xl font-light mb-6'>Lorem ipsum dolor sit amet consectetur.</p>
          <div className='w-[50%] h-12 bg-white flex items-center border-2'>
            <input placeholder='Your Email' className='flex-1 px-4 border-none' />
            <div className='pl-3 pr-2 bg-teal-500 h-full flex items-center justify-center hover:border-none'>
              <Send className='text-white' />
            </div>
          </div>
        </div>
      );
    }
    
    
 

export default Newsletter