

import React from 'react';
import { useDispatch } from "react-redux";
import { logout } from "../api/authSlice";

const Navbar = () => {
  function redirectToLoginPage() {
    const url = `http://localhost:3001/login`;
    window.location.href = url;
  }
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    localStorage.removeItem('token');
    const url = `http://localhost:3001/login`;
    window.location.href = url;
  };
  return (
    <>
      {/* <!-- Header --> */}
      <header>
        {/* <!-- navbar and menu --> */}
        <nav className="shadow">
          <div className="flex justify-between items-center py-6 px-10 container mx-auto">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-tr from-indigo-600 to-teal-200 bg-clip-text text-transparent hover:cursor-pointer">
                ShopXpress
              </h1>
            </div>

            <div>
              <div className="hover:cursor-pointer sm:hidden">
                <span className="h-1 rounded-full block w-8 mb-1 bg-gradient-to-tr from-indigo-600 to-teal-200"></span>
                <span className="h-1 rounded-full block w-8 mb-1 bg-gradient-to-tr from-indigo-600 to-teal-200"></span>
                <span className="h-1 rounded-full block w-8 mb-1 bg-gradient-to-tr from-indigo-600 to-teal-200"></span>
              </div>
              
              <div className="flex items-center">
                <ul className="sm:flex space-x-4 hidden items-center">
                  <li> <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">

                    {/* ///Serach */}
   <input type="text" placeholder="Search" className=" bg-gray-100 rounded-md  outline-none pl-2 ring-indigo-700 w-full mr-2 p-2"/>
  <span><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-" fill="none" viewBox="0 0 24 24" stroke="currentColor ">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg></span>
      </div></li>
                  <li>
                    <a
                      href="#d"
                      className="text-gray-700 hover:text-blue-900 text-md relative group"
                    >
                      Home
                      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-tr from-teal-200 to-blue-600 rounded-full transform translate-y-2 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#dd"
                      className="text-gray-700 hover:text-blue-900 text-md relative group"
                    >
                      About
                      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-tr from-teal-200 to-blue-600 rounded-full transform translate-y-2 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#d"
                      className="text-gray-700 hover:text-blue-900 text-md relative group"
                    >
                      Services
                      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-tr from-teal-200 to-blue-600 rounded-full transform translate-y-2 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#d"
                      className="text-gray-700 hover:text-blue-900 text-md relative"
                    >
                      Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="#d"
                      className="text-gray-700 hover:text-blue-900 text-md relative"
                    >
                      Contact
                    </a>
                  </li>
                </ul>

                <div className="md:flex items-center hidden space-x-4 ml-8 lg:ml-12">
                  <h1 onClick={handleLogout} className="text-text-gray-600 py-2 hover:cursor-pointer hover:text-indigo-600" >
                    LOGOUT
                  </h1>
                  <h1 onClick={redirectToLoginPage} className="text-text-gray-600 py-2 hover:cursor-pointer px-4 rounded text-white bg-gradient-to-tr from-blue-500 to-teal-200 hover:shadow-lg">
                    LOGIN
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
