import { Book, query } from "./interfaces/book";
import { Card } from "./interfaces/card";

const BACKEND_URL = "https://google-hack-backend-one.vercel.app";

export async function getNews(inputValue:string){
    let url= BACKEND_URL+`/news/news_query/?q=${inputValue}`;
    const response = (await fetch(url));
    return response;
  }
  
export async function getStory(inputValue:query){
    let url= BACKEND_URL+'/qapi/getstory';
    
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({"ques": inputValue.ques })
      };
    const response = (await fetch(url,options)).json();
    let data = await response;
    //let data = "\nTesla is a company that makes electric cars and other things to help us move towards using less gas and more clean energy.\nThey've been selling more cars and making more money. They're also investing in new things to make their cars even better.\n* Changes in the value of money in different countries can affect their earnings\n* Tesla has had some legal problems.\nTesla is still focused on making electric cars and helping the environment. They're planning to keep investing in new things to make their cars even better and to make them more affordable."
    const res = {author: inputValue.author,lines: data.split("\n"), title: inputValue.title}
    return new Response(JSON.stringify(res));
  }
  