'use client'
import Image from 'next/image'
import profilePic from '../../public/backgroun.jpeg'
import React, { SyntheticEvent, useEffect, useState } from 'react';

export default function Dashboard() {
  const [text, setText] = useState("")

  useEffect(()=>{
    let t = "Welcome \n to \n STORY TAILOR!";
    let c = 1;
    let timer = setInterval(()=>{
      if(c<=t.length){
        setText(t.slice(0,c));
      c++;
      }
      else{
        clearInterval(timer);
      }
    },100);
    return ()=>clearInterval(timer);
  },[])

    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
     
      <div className="absolute inset-0 z-0">
        
        <Image src={profilePic} alt="Background" className="object-cover w-full h-full" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
      </div>
      
      <div className="backdrop-custom relative justify-center z-10 text-center text-white w-1/2 margin-top-10">
        <h1 className="text-5xl font-normal p-8 whitespace-pre-line ">{text}</h1>
    
        
          {/* {answer==null ? <div>dat is not available </div>: <div>dia is available</div> } */}
        
      </div>
     
    </div>
    )
  }