/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../Components/Navbar';
import Single3 from "../../assets/admin.jpg"
const AdminDashboard = () => {
    const isAdmin = useSelector(state => state.user.isAdmin);
    const navigate = useNavigate(); 

   

    return (
       
            <div className="bg-white">
              <div className="section-container flex flex-col lg:flex-row"> {/* Two-column layout */}
                <div className="flex-1 relative">
            <Navbar />
            <h1 className='text-4xl font-bold text-center absolute-top-15 h-16 '>Welcome to admin dashboard</h1>
            <img className='
       h-[340px] w-[2040px]  item-center'src={Single3} alt=""/>
         
          </div>
          </div>
        </div>
    );
};

export default AdminDashboard;
