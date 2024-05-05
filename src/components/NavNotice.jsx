import React, { useState } from 'react';

const NavNotice = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  return (
    <li className='nav-item dropdown'>
      <a className='nav-link nav-icon' href='#' onClick={toggleNotifications}>
        <button className="inline-block relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-green-400 bg-green-600"></span>
        </button>
        <span className='badge bg-primary badge-number'>4</span>
      </a>

      {showNotifications && (
        <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow notification' style={{ marginTop: '200px' }}>
          <li className='dropdown-header'>
            You have 4 new notifications
            <a href='#'>
              <span className='badge rounded-pill bg-primary p-2 ms-2'>
                View all
              </span>
            </a>
          </li>

          <li>
            <hr className='dropdown-divider' />
          </li>

          <li className='notification-item'>
          
            <div>
              <h4>Lorem Ipsum</h4>
              <p>Quae dolorem earum vertiatis oditseno</p>
              <p>30 min, ago</p>
            </div>
          </li>

          <li>
            <hr className='dropdown-divider' />
          </li>

          <li className='notification-item'>
            <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div>
              <h4>Atque sjjjllk</h4>
              <p>qqqqqqqqqqqq</p>
              <p>1 hr, ago</p>
            </div>
          </li>

          <li>
            <hr className='dropdown-divider' />
          </li>

          <li>
            <a href='#'>show all notifications</a>
          </li>
        </ul>
      )}
    </li>
  );
};

export default NavNotice;
