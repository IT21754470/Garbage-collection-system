/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const isAdmin = currentUser && currentUser.isAdmin;
  const isEmployee = currentUser && currentUser.isEmployee;
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
  const menuRef = useRef(null); // Ref to the menu element

  // Sign out user
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      window.location.href = '/signin';
    } catch (error) {
      const data = error.response.data;
      dispatch(deleteUserFailure(data.message));
    }
  };

  // Close menu when clicking outside
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  console.log(isEmployee);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3.5">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Sahand</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          {currentUser && isAdmin && (
            <Link to="/admin-dashboard">
              <li className="text-slate-700 hover:underline">
                Admin Dashboard
              </li>
            </Link>

           
          )} 

          {currentUser && isEmployee && (
            <Link to="/employee-dashboard">
              <li className="text-slate-700 hover:underline">
                Employee Dashboard
              </li>
            </Link>
          )}


          {currentUser ? (
            <div className="relative" ref={menuRef}>
              <img
                onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu visibility
                className="rounded-full h-7 w-7 object-cover cursor-pointer"
                src={currentUser.avatar}
                alt="profile"
              />
              {isMenuOpen && ( // Render menu if isMenuOpen is true
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-md">
                  <Link to="/profile">
                    <button className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left hover:text-blue-600">
                      Profile
                    </button>
                  </Link>
                  <button onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left hover:text-blue-600">
                    Logout
                  </button>
                </div>
              )}


            </div>
          ) : (
            <Link to="/sign-in">
              <li className="text-slate-700 hover:underline">Sign in</li>
            </Link>
          )}

         
        </ul>
      </div>
    </header>
  );
}
