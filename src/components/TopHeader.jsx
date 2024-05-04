import React from 'react'
import './topHeader.css';
import Logo from './Logo';

function TopHeader() {
  return (
    <div className="header">
    <header className="justify-between items-center px-3 max-w-6xl mx-auto">
       <Logo/>
    </header>
  
    </div>
  )
}

export default TopHeader
