import React from 'react'
import './nav.css';
import NavNotice from './NavNotice';
import NavMessage from './NavMessage';
import NavAvatar from './NavAvatar';

const Nav = () => {
  return (
    <nav className='header-nav ms-auto mt-6'>
    <ul className='flex align-items-center justify-center'>
        <NavNotice/>
        <NavMessage/>
        <NavAvatar/>
    </ul>
    </nav>
  )
}

export default Nav