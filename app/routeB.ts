import { Book, query } from "./interfaces/book";
import { Card } from "./interfaces/card";


export async function getNews(inputValue:string){
    let url= `http://localhost:8000/news/news_query/?q=${inputValue}`;
    const response = (await fetch(url)).json()
    let data = await response
    const cards = data.filter((obj:Card) => obj.title !== "[Removed]")
    return new Response(cards)
  }
  
export async function getStory(inputValue:query){
    let url= 'http://localhost:8000/qapi/getstory';
    let obj ={"ques": inputValue.ques }
    const response = (await fetch(url,{
      method: 'POST',
      body:JSON.stringify(obj)
    })).json()
    let data = await response
    //let data = "\nTesla is a company that makes electric cars and other things to help us move towards using less gas and more clean energy.\nThey've been selling more cars and making more money. They're also investing in new things to make their cars even better.\n* Changes in the value of money in different countries can affect their earnings\n* Tesla has had some legal problems.\nTesla is still focused on making electric cars and helping the environment. They're planning to keep investing in new things to make their cars even better and to make them more affordable."
    const res = {author: inputValue.author,lines: data.split("\n"), title: inputValue.title}
    return new Response(JSON.stringify(res));
  }
  