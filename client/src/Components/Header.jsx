
import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { FaBell } from 'react-icons/fa';
import NotificationBell from './NotificationBell';
import img2  from '../assets/30.png'


export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const isAdmin = currentUser && currentUser.isAdmin;
  const isEmployee = currentUser && currentUser.isEmployee;
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const menuRef = useRef(null); 

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
      window.location.href = '/sign-in';
    } catch (error) {
      const data = error.response.data;
      dispatch(deleteUserFailure(data.message));
    }
  };


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
    <header className="bg-slate-200 shadow-xl p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3.5 absolute-top-3">
    
        
      <img className="h-16 w-auto" src={img2} alt="Contact Us" />
  
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
       
        <ul className="flex gap-4">
       <div className="flex items-center gap-4 ml-auto">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
              Home
            </li>
          </Link>
  
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
              About
            </li>
          </Link>
  
          <Link to="/contact">
            <li className="hidden sm:inline text-slate-700 hover:underline bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
              Contact
            </li>
          </Link>
  
          <Link to="/feed">
            <li className="hidden sm:inline text-slate-700 hover:underline bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
              Feedback
            </li>
          </Link>
</div>
          {currentUser && isAdmin && (
            
            <Link to="/admin-dashboard">
              <li className="text-gray-900">
                Admin Dashboard
              </li>
             
            </Link>
          )}
  
          {currentUser ? (
            <div className="relative flex items-center gap-4">

              <NotificationBell/>
              <img
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="rounded-full h-7 w-7 object-cover cursor-pointer"
                src={currentUser.avatar}
                alt="profile"
              />
              
              {isMenuOpen && ( 
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-md" ref={menuRef}>
                  <Link to="/profile">
                    <button className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left hover:text-blue-600">
                      Profile
                    </button>
                  </Link>
                  <button
                    onClick={handleSignOut}
                 
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left hover:text-blue-600"
                  >
                   
                    Logout
                  
                  </button>
                 
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-in">
              <li className="hidden sm:inline text-slate-700 hover:underline bg-gray-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}