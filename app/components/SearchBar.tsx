import React, { EventHandler, SyntheticEvent, useEffect, useRef } from 'react'

interface SearchComponentProps {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleClick: (event: React.SyntheticEvent) => void;
    isDisabled: boolean;
  }


const SearchBar:React.FC<SearchComponentProps> = ({handleInputChange, handleClick, isDisabled}) =>{
    const search = useRef<HTMLDivElement | null>(null);
    useEffect(()=>{
      document.addEventListener("click",(e)=>{
        if(search.current && search.current.contains(e.target as Node)){
            search.current.classList = "flex justify-center focused";
        }
        else if(search.current){
            search.current.classList = "flex justify-center not-focused";
        }
      });
    },[]);
        
    
  return (
    <div ref={search} className="flex justify-center" id='searchBar'>
        <input id='search__ip' placeholder='Search' type="search" 
        className="text-black font-bold py-2 px-4 rounded mr-4 w-[12rem]" onInput={handleInputChange} />
        <button disabled={isDisabled}
        className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-fit disabled:bg-gray-900" 
        onClick={handleClick}>
            Search
        </button>
    </div>
  )
}

export default SearchBar