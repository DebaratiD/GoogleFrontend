// pages/index.tsx
'use client'
import React, { useEffect, useState } from 'react';
import CardComponent from '../components/CardComponent';
import { Card } from '../interfaces/card';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import {data} from '../sampledata'
import BookDiv from '../components/bookDiv';
import { Book} from '../interfaces/book';
import { GET, POST } from '../api/route';

const CardViewer:React.FC<{cards:Card[], handleShowStory:Function}> = ({cards,handleShowStory})=>{
  return cards.map((card, index) =>           
    <CardComponent key={index} cardData={card} showNews={handleShowStory}/>)
}

  let b:Book = {author:'',title:'', lines:[]} 
function CardDashboard() {
  const [cards, setCards] = useState<Card[]>([])
  const [showStory, setShowStory] = useState(false)
  const [bookToShow, setBookToShow] = useState<Book>(b)

 
  useEffect(()=>{ 
  const query = String(localStorage.getItem('query')).split(' ')
  let query2 = query.length>1?query.join('+'):query[0];  

    const req = new Request(`http://localhost:8000/news/news_query/?q=${query2}`,{method:'GET',
    headers: {
      'Content-Type': 'application/json',
    }
    })
     
    GET(req)
    .then((val)=>val.json())
    .then((val:any)=>{
      const data = val.filter((obj:Card) => obj.title !== "[Removed]")
      setCards(data);})
  },[setCards])
  // 
  const handleShowStory=(c:Card)=>{
    const req = new Request(`http://localhost:8000/qapi/getstory/`,{method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({ques:c.content})
    })

    POST(req)
    .then((response)=>response.json())
    .then((val:string)=>{
      let lines:string[] = val.split('\n\n')
      lines = lines.map((l:string)=>l.replace('\n',' ')).filter(l=>l.length>0)
      setBookToShow({author:c.author, lines:lines, title:c.title});
    });
    setShowStory(true);
  }

  return (

      <div>
        
        <Navbar/>
        {showStory==false &&
        <div className="bggradient grid min-h-screen lg:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-2">

          
        <CardViewer cards={cards} handleShowStory={handleShowStory}/>
          </div>}
        
        {showStory==true && bookToShow.title.length>0 &&
        <div className='bggradient min-h-screen text-center'>
        <div className='flex p-5 justify-center'>
          <BookDiv bookContent={bookToShow} showStory={(val:boolean)=>{setShowStory(val); setBookToShow(b)}}/>
          
        </div>
        <p>Click on the cards to know what happens next</p>
        </div>
        }
        {showStory==true && bookToShow.title.length==0 && 
        <div className="flex items-center justify-center bggradient min-h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>
      </div>}
        
    </div>
  );
};

export default CardDashboard;
