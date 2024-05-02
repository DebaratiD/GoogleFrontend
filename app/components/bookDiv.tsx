import React, { ReactElement, useEffect, useState } from 'react';
import { Book } from '../interfaces/book';
import Carousel from 'react-spring-3d-carousel';
import {v4} from 'uuid';
import {config} from 'react-spring';


interface page{
  key: string;
  content: JSX.Element;
  onClick: () => void;
}
const BookDiv: React.FC<{ bookContent:Book, showStory: Function }> = ({bookContent, showStory}) => {
  const goBack = ()=>{
    showStory(false);
  }

  const [pages, setPages] = useState<page[]>([]);
  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: false,
    config: config.gentle,
  });

    let numPages = bookContent.lines.length
  useEffect(() => {
    let newPages:page[] = [];
    for (let i = 0; i < numPages; i++) {
      newPages.push({
        content:<div className="line grid"><p>{bookContent.lines[i]}</p><span className="pageNumber">{i+1}</span></div>,
      key:v4(), onClick: () =>{if(state.goToSlide<i+1){setState({ ...state, goToSlide: i})}}});
    }
    setPages(newPages);
  }, [numPages, setPages, bookContent]);

  return (
    <div className="w-[100%] flex">
      <div>
        <button className="go-back" onClick={goBack}>
          Go Back
        </button>
      </div>
      
      <div className="flex items-start justify-center" style={{padding: '2% 10%', width:'80%'}}>
        <div className="grid gap-2">
          <h1 className="text-2xl">{bookContent.title}</h1>
          <p className="text-lg">- By {bookContent.author}</p>
          
          <div style={{ width: '80%', height: '500px', margin: '0 auto' }}>
            <Carousel
              slides={pages}
              goToSlide={state.goToSlide}
              offsetRadius={state.offsetRadius}
              showNavigation={state.showNavigation}
              animationConfig={state.config}
            />
          </div>
        </div>
      </div>
    </div>
      
  );
};

export default BookDiv;