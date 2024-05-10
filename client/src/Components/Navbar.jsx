import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="bg-gray-800 text-white flex justify-between items-center h-16 px-6 md:px-12">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Hamburger Menu for smaller screens */}
      <div onClick={handleNav} className="md:hidden">
        {navOpen ? (
          <AiOutlineClose size={24} />
        ) : (
          <AiOutlineMenu size={24} />
        )}
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-6 uppercase text-sm">
        <li>
          <Link to="/users">All Users</Link>
        </li>
        <li>
          <Link to="/addEmployee">Employee Management</Link>
        </li>
        <li>
          <Link to="/pickup">Create Schedule</Link>
        </li>
        <li>
          <Link to="/specialpickupTable">Special Pickups</Link>
        </li>
      </ul>

      {/* Mobile Navigation */}
      <div
        className={
          navOpen
            ? 'fixed left-0 top-0 w-3/5 h-full bg-gray-700 border-r border-gray-600 ease-in-out duration-300 p-6 z-10'
            : 'fixed left-[-100%] top-0 h-full ease-in-out duration-300'
        }
      >
        <ul className="flex flex-col gap-6 uppercase text-sm text-white">
          <li>
            <Link to="/users" onClick={handleNav}>
              All Users
            </Link>
          </li>
          <li>
            <Link to="/addEmployee" onClick={handleNav}>
              Employee Management
            </Link>
          </li>
          <li>
            <Link to="/pickup" onClick={handleNav}>
              Create Schedule
            </Link>
          </li>
          <li>
            <Link to="/specialpickupTable" onClick={handleNav}>
              Special Pickups
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
