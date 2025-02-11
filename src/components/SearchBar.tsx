import React from 'react';
import SearchSVG from '../assets/Search.svg?react';

function SearchBar() {
  return (
    <div className='flex items-center justify-end'>
      <input className='h-6 my-4 w-80 border border-white border-b-gray-400 pl-2 pr-2 focus:outline-none '/>
      <SearchSVG className='cursor-pointer h-8 w-8 fill-theme-color-500'/>
    </div>
  );
}

export default SearchBar;
