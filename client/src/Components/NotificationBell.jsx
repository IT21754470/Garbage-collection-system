import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
        className={`text-2xl cursor-pointer ${unreadCount > 0 ? 'text-red-500' : 'text-gray-800'}`}
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-md w-56">
          {notifications.length === 0 ? (
            <div className="p-4 text-center">No new notifications</div>
          ) : (
            notifications.map((notification, index) => (
              <div key={index} className="p-4 border-b hover:bg-gray-100">
                {notification.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
