import Image from 'next/image'
import profilePic from '../../public/icon-img.jpeg';
import Link from 'next/link';

const Navbar = () => {
  return (
<nav className="bg-gray-800">
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
      <p className="text-lg mt-4 mb-4">With Gemini Pro</p>
      
    </div>
  </div>

</nav>
  );
};

export default Navbar;