'use client'
import Image from 'next/image'
import profilePic from '../../public/backgroun.jpeg'
import React, { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const router = useRouter();

  const handleClick = async (e:SyntheticEvent) => {
    e.preventDefault()
    localStorage.setItem('query', inputValue);
    router.push(`/newspage`);    
  }


    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
     
      <div className="absolute inset-0 z-0">
        
        <Image src={profilePic} alt="Background" className="object-cover w-full h-full" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
      </div>
      
      <div className="relative justify-center z-10 text-center text-white w-1/2 margin-top-10">
        <h1 className="text-4xl font-bold mb-6">STORY TAILOR</h1>
        <div className="flex justify-center">
          <input type="search" className="text-black font-bold py-2 px-4 rounded mr-4 w-1/2" onChange={handleInputChange} />
          <button className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-1/6" onClick={handleClick}>
            Search
          </button>
        </div>
    
        
          {/* {answer==null ? <div>dat is not available </div>: <div>dia is available</div> } */}
        
      </div>
     
    </div>
    )
  }