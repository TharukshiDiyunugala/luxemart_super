import React from 'react';
import profileImg from '../assets/user.png'

const NavAvatar = () => {
  return (
    <li className='nav-item dropdown pe-3'>
        <a
        className='nav-link nav-profile d-flex align-items-center pe-0'
        href='#'
        data-bs-toggle='dropdown'
        >
            <img src={profileImg} alt='profile' className='rounded-circle'/>
            <span className='d-none d-md-block dropdown-toggle ps-2'>F. David</span>
        </a>

        {/* <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'>
            <li className='dropdown-header'>
                <h6>David</h6>
            </li>
        
        <li>
            <a className='dropdown-item d-flex align-items-center' href='#'>
                <span>Sign Out</span>
            </a>
        </li>
        </ul> */}
    </li>
  );
}

export default NavAvatar