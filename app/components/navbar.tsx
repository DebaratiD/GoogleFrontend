import Image from 'next/image'
import profilePic from '../../public/icon-img.jpeg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, SyntheticEvent } from 'react';
import SearchBar from './SearchBar';

const Navbar = ({show=true, loadData}:{show?:boolean, loadData?:()=>{}}) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const router = useRouter();

  const handleClick = async (e:SyntheticEvent ) => {
    e.preventDefault()
    localStorage.setItem('query', inputValue);
    if(router.pathname!=="/newspage"){
      router.push(`/newspage`);    
    }
    
    if(loadData!=undefined){
      loadData();
    }
  }
  return (
  <nav className="bg-gray-800 z-[1] fixed w-full top-0">
    <div className="mx-auto max-w-10xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <Image src={profilePic} alt="Your Company" className="h-10 w-auto rounded" />
          </div>
          
            <div className="flex space-x-4">
              <Link href="/" className="bg-gray-900 text-white rounded-md px-3 py-2 text-lg font-medium" aria-current="page">Story Tailor</Link>
            </div>
            
        </div>
        {show===true && <SearchBar handleInputChange={handleInputChange} handleClick={handleClick} isDisabled={inputValue===""}/>}
        <p className="text-lg mt-4 mb-4">With Gemini 2.0 Flash</p>
        
      </div>
    </div>

  </nav>
  );
};

export default Navbar;