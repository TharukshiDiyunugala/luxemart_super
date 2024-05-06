import React from 'react'
import './topHeader.css';
import Logo from './Logo';
import { SearchBar } from './SearchBar';
import Nav from './Nav';

function TopHeader() {
  return (
    <div className="header" >
    <header className="fixed align-items-center flex w-full justify-align-center" style={{ backgroundColor: '#c5c3c7', height: '50px'  }}>
          
       <Logo/>
       <SearchBar/>
       <Nav/>
    </header>
  
    </div>
  )
}

export default TopHeader
