// pages/index.tsx
'use client'
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import { Card } from '../interfaces/card';

function CardDashboard() {
  const [cards, setCards] = useState(Array<Card>)

  async function getNews(inputValue:string){
    let url= 'http://localhost:8000/news/news_query/?q='+inputValue;
    const response = (await fetch(url)).json()
    let data = await response
    const cards:Card[] = data.filter((obj:Card) => obj.title !== "[Removed]")
    return cards
  }
  
  const params = useSearchParams()
  const query = String(params.get('query'))
  getNews(query).then((val)=>{
    setCards(val);
  })

  return (

      <div>
        
        <Navbar/>

        <div className="news-cards grid h-screen lg:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-2">

          {cards.map((card, index) => (
          
          <CardComponent key={index} cardData={card} />
        ))}
        </div>
        
    </div>
  );
};

export default CardDashboard;
