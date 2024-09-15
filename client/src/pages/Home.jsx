import React from 'react'
import { useEffect, useState } from 'react'
import { RoboticIcon,InformationDiamondIcon,DepartementIcon } from 'hugeicons-react';
import { QuestionIcon,MessageTranslateIcon } from 'hugeicons-react';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navig = useNavigate();
  const [login,setLogin] = useState();
  useEffect(()=>{
      if(window.localStorage.getItem(login))
      {
        setLogin(true);
      }
      else
      {
        setLogin(false);
      }
    },[])
  return (
    <div className="h-screen bg-gradient-to-r from-blue-400 to-purple-200">
      <div className="t-0">
        <h1 className="text-5xl font-extrabold text-white bg-black p-4">
          Fruit.ai
        </h1>
      </div>
      <div className="flex flex-wrap gap-4 w-full items-center justify-center h-1/2 mt-20 md:mt-0">
        <button className="h-[130px] w-[130px] flex flex-col items-center p-8 rounded-lg shadow-lg text-lg font-bold text-gray-800 transition duration-300 ease-in-out bg-green-200 hover:bg-green-300 hover:shadow-inner transform hover:translate-y-1" onClick={()=>{navig("/chatbot")}}>
          <RoboticIcon size={42} />
          <p>Chatbot</p>
        </button>

        <button className="h-[130px] w-[130px] flex flex-col items-center p-8  rounded-lg shadow-lg text-lg font-bold text-gray-800 transition duration-300 ease-in-out bg-blue-200 hover:bg-blue-300 hover:shadow-inner transform hover:translate-y-1">
          <QuestionIcon size={42} />
          <p>FAQs</p>
        </button>

        <button className="h-[130px] w-[130px] flex flex-col items-center p-8  rounded-lg shadow-lg text-lg font-bold text-gray-800 transition duration-300 ease-in-out bg-red-200 hover:bg-red-300 hover:shadow-inner transform hover:translate-y-1">
          <MessageTranslateIcon size={42} />
          <p>Translate</p>
        </button>

        <button className="h-[130px] w-[130px] flex flex-col p-8 items-center rounded-lg shadow-lg text-lg font-bold text-gray-800 transition duration-300 ease-in-out bg-orange-200 hover:bg-orange-300 hover:shadow-inner transform hover:translate-y-1">
          <DepartementIcon size={42}/>
          <p>Demo</p>
        </button>

        <button className="h-[130px] w-[130px] flex flex-col p-8 items-center rounded-lg shadow-lg text-lg font-bold text-gray-800 transition duration-300 ease-in-out bg-violet-200 hover:bg-violet-300 hover:shadow-inner transform hover:translate-y-1">
          <DepartementIcon size={42}/>
          <p>Demo</p>
        </button>

        <button className="h-[130px] w-[130px] flex flex-col p-8 items-center rounded-lg shadow-lg text-lg font-bold text-gray-800 transition duration-300 ease-in-out bg-yellow-200 hover:bg-yellow-300 hover:shadow-inner transform hover:translate-y-1">
          <InformationDiamondIcon size={42} />
          <p>About</p>
        </button>
      </div>
    </div>
  );
}
