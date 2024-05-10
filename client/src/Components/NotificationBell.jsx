import React, { useState, useEffect } from 'react';
import { FaBell, FaTrash } from 'react-icons/fa'; // Importing FaTrash for delete icon
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

  const handleDelete = async (notificationId) => {
    try {
      await axios.delete(`/api/specialpickup/notifications/${notificationId}`); 
      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== notificationId) // Remove from state
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

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
          <h1 className='font-bold text-center'>Notifications</h1>

          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No new notifications</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className="flex items-center p-4 border-b border-gray-300 bg-white hover:bg-gray-200 transition duration-200 ease-in-out relative"
              >
                <img
                  src={img}
                  alt="Notification icon"
                  className="w-8 h-8 rounded-full mr-4"
                />
                <span>{notification.message}</span>

                <FaTrash
                  className="text-green-500 cursor-pointer absolute right-2"
                  onClick={() => handleDelete(notification._id)} // Delete handler
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
