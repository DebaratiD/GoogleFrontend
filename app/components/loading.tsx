import React from 'react';
import '../globals.css';

function Loading() {
  return (
    // From Uiverse.io by abrahamcalsin
    <div className='h-full w-full z-30 fixed flex justify-center items-center' style={{background: "rgb(254, 238, 246, 80%)"}}>
        <div className="dot-spinner">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
    </div>
    </div>
    
  )
}

export default Loading;