import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../Components/Navbar';
import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; // Importing necessary components and scales
import { Chart as ChartJS } from 'chart.js'; // Import the Chart base for registration
import { FaUserPlus, FaTasks, FaChartLine } from 'react-icons/fa';

// Register the required scales and elements with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for user growth over time
const userGrowthData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'User Growth',
      data: [65, 59, 80, 81, 56, 55, 70],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const AdminDashboard = () => {
  const isAdmin = useSelector((state) => state.user.currentUser?.isAdmin);

  if (!isAdmin) {
    return <div>Access Denied. Only admins can access this page.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-green-100">
      <Navbar />

      <div className="flex flex-wrap justify-around p-8 gap-6">
      
        <div className="flex flex-col items-center bg-white shadow-lg rounded-md p-6 w-[250px]">
          <FaUserPlus size={30} className="text-blue-500" />
          <h2 className="text-lg font-bold mt-4">New Users</h2>
          <p className="text-gray-600">45 this week</p>
        </div>

        <div className="flex flex-col items-center bg-white shadow-lg rounded-md p-6 w-[250px]">
          <FaTasks size={30} className="text-green-500" />
          <h2 className="text-lg font-bold mt-4">Pending Tasks</h2>
          <p className="text-gray-600">12 pending</p>
        </div>

        <div className="flex flex-col items-center bg-white shadow-lg rounded-md p-6 w-[250px]">
          <FaChartLine size={30} className="text-red-500" />
          <h2 className="text-lg font-bold mt-4">User Growth</h2>
          <div className="w-full h-[200px]"> {/* Wrapper to maintain aspect ratio */}
            <Line data={userGrowthData} options={{ maintainAspectRatio: false }} /> {/* Ensure Line is defined */}
          </div>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="flex flex-wrap justify-around gap-8 mt-8">
        <div className="bg-white shadow-lg rounded-md p-6 w-[400px]">
          <h2 className="text-lg font-bold mb-4">User Management</h2>
        <p>This inform you how to efficiently manage of the user base system</p>
        </div>

        <div className="bg-white shadow-lg rounded-md p-6 w-[400px]">
          <h2 className="text-lg font-bold mb-4">Task Management</h2>
        <p>All tasks are manages by Adimns with excellency knowledge of them</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
