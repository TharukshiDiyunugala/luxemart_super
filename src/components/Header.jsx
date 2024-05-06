import React from "react";
import {useLocation,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";



export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [pageState,setPageState]=useState();
    const auth = getAuth();

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setPageState("Profile");
        } else {
          setPageState("Sign in");
        }
      });
    }, [auth]);

  function pathMatchRoute(route) {
    return location.pathname === route;
  }

    
  return (
    <div className="fixed left-0 top-60px h-full overflow-y-auto w-64 p-4 bg-gray-600 border-b shadow-sm z-50 sidebar-menu transition-transform">
        <header className="justify-between items-center px-3 max-w-6xl mx-auto">
        {/* <div>
        <a href="/" className="flex items-center pb-4 ">
          <img
            src="../assets/logo1.png"
            alt=""
            className="h-5 cursor-pointer"
            onClick={() => navigate('/')}
          />
          <span className="text-lg font-bold text-white ml-3">LuxeMart</span>
          </a>
        </div> */}
        <div>
            <ul className="mt-4">

            <li className={`mb-1 group ${pathMatchRoute("/") ? "active" : ""}`} onClick={() => navigate("/")}>
        <div className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md ${pathMatchRoute("/") ? "bg-gray-800 text-white" : ""}`}>
          <i className="ri-home-2-line mr-3 text-lg"></i>
          Home
        </div>
      </li>
      <li className={`cursor-pointer items-center py-3 px-4 text-sm text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800
       group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle border-b-[3px] border-b-transparent 
       ${pathMatchRoute("/offers") ? "bg-gray-800 text-white" : ""}`} onClick={() => navigate("/offers")}>
        <i class="ri-instance-line mr-3 text-lg"></i>
        Categories
      </li>

      <li className={`cursor-pointer items-center py-3 px-4 text-sm text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800
       group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle border-b-[3px] border-b-transparent 
       ${pathMatchRoute("/add-products") ? "bg-gray-800 text-white" : ""}`} onClick={() => navigate("/add-products")}>
        <i class="ri-add-line mr-3 text-lg"></i>
        Add Products
      </li>

      <li className={`cursor-pointer items-center py-3 px-4 text-sm text-gray-300 border-b-[3px] border-b-transparent ${pathMatchRoute("/sign-in") || 
      pathMatchRoute("/profile") ? "bg-gray-800 text-white" : ""}`} onClick={() => navigate("/profile")}>
        <i class="ri-login-box-line mr-3 text-lg"></i>
        {pageState}
      </li>
                
            </ul>
        </div>
      </header>
    
    </div>
  );
}
