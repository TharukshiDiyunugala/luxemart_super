import React from 'react'
import './topHeader.css';
import Logo from './Logo';
import { SearchBar } from './SearchBar';
import Nav from './Nav';

function TopHeader() {
  return (
    <div className="header">
    <header className="align-items-center flex fixed-top w-full justify-align-center">
       <Logo/>
       <SearchBar/>
       <Nav/>
    </header>
  
    </div>
  )
}

export default TopHeader
