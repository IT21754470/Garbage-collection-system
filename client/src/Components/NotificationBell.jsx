import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';
import img from '../assets/31.png'; // The image to use as the icon

const NotificationBell = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentUser || !currentUser._id) {
        console.error('Current user or user ID is not available');
        return;
      }

      try {
        const response = await axios.get(`/api/specialpickup/notifications/${currentUser._id}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [currentUser]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <FaBell
        className={`text-2xl cursor-pointer transition duration-300 ease-in-out ${
          unreadCount > 0 ? 'text-red-500' : 'text-gray-800'
        }`}
        onClick={toggleDropdown}
      />

      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-56 z-10 transition-opacity duration-300 ease-in-out"
          style={{ opacity: isDropdownOpen ? 1 : 0 }}
        >
          <h1 className='font-bold '>Notifications</h1>
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No new notifications</div>
          ) : (
            notifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-center p-8 border-b border-gray-700 bg-gray-300 hover:bg-green-200 transition duration-200 ease-in-out"
              >
             
                <img
                  src={img} 
                  alt="Notification icon"
                  className="w-7 h-8 rounded-full mr-8 absolute top-12 left-0" 
                />
                <span>{notification.message}</span> 
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
