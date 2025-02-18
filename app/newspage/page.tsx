// pages/index.tsx
'use client'
import React, { useEffect, useState } from 'react';
import CardComponent from '../components/CardComponent';
import { Card } from '../interfaces/card';
import Navbar from '../components/navbar';
import BookDiv from '../components/bookDiv';
import { Book, query} from '../interfaces/book';
import {data} from '../sampledata'
import { getNews, getStory } from '../routeB';
import Loading from '../components/loading';

const CardViewer:React.FC<{cards:Card[], handleShowStory:Function}> = ({cards,handleShowStory})=>{
  return cards.map((card, index) =>           
    <CardComponent key={index} cardData={card} showNews={handleShowStory}/>)
}

  let b:Book = {author:'',title:'', lines:[]} 
function CardDashboard() {
  const [cards, setCards] = useState<Card[]>(data)
  const [showStory, setShowStory] = useState(false)
  const [bookToShow, setBookToShow] = useState<Book>(b);
  const [loading, setLoading] = useState(false);

 
  useEffect(()=>{ 
  const query = String(localStorage.getItem('query')).split(' ')
  let query2 = query.length>1?query.join('+'):query[0];  
  setLoading(true);

    const getCards = async()=>{
      await getNews(query2).then((val)=>val.json())
    .then((val:any)=>{
      const data = val.filter((obj:Card) => obj.title !== "[Removed]")
      setCards(data);})
      setLoading(false);
    };
    getCards();
    
  },[])
  // 
  const handleShowStory=async (c:Card)=>{
    let postObj:query = {
      ques:c.content,
      author:c.author,
      title:c.title
    }
    setLoading(true);
    await getStory(postObj)
    .then((response)=>response.json())
    .then((val)=>{
      let {author,lines,title}= val;
      lines = lines.map((l:string)=>l.replace('\n',' ')).filter((l:string)=>l.length>0)
      setBookToShow({author:author, lines:lines, title:title});
    });
    setShowStory(true);
    setLoading(false);
  }

  return (

      <div className='relative'>
        {loading && <Loading />}
        <Navbar/>
        {!loading && showStory==false &&
        <div className="bggradient grid min-h-screen lg:grid-cols-3 grid-rows-3 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-2">

          
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
