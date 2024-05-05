import React from 'react';

const Logo = () => {
    const handleToggleSideBar = () => {
        document.body.classList.toggle('toggle-sidebar');
    };

    return (
        <div className='flex items-center justify-between'>
            <a href="/" className='logo flex items-center'>
                <span className='d-none d-lg-block'>LuxeMart</span>
                
            </a>
            
            <button className="relative toggle-sidebar-btn" onClick={handleToggleSideBar}>
                <div className="relative flex overflow-hidden items-center justify-center rounded-full w-8 h-8 transition-all duration-200 shadow-md bg-slate-700 ring-0 ring-gray-300 hover:ring-8 focus:ring-4 ring-opacity-30">
                    <div className="flex flex-col justify-between w-3 h-5 transform origin-center transition-all duration-500 overflow-hidden">
                        <div className="bg-white h-0.5 w-4 transform transition-all duration-500 group-focus:rotate-45 -translate-x-1"></div>
                        <div className="bg-white h-0.5 w-4 rounded transition-all duration-500 "></div>
                        <div className="bg-white h-0.5 w-4 transform transition-all duration-500 group-focus:rotate-45 -translate-x-1"></div>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default Logo; 
