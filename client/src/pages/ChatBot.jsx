import React from 'react'
import { RoboticIcon } from 'hugeicons-react'
export default function ChatBot() {
  return (
    <div className='bg-gray-100 flex flex-col'>
        <header className='bg-black w-full p-4 text-white flex gap-2 sm:text-3xl items-center top-0 h-[80px]'>
            <RoboticIcon size={40}/> <p>John Doe</p>
        </header>
        <main>

        </main>
        <div className='absolute bottom-0'>
            <input type="text" />
        </div>
    </div>
  )
}
