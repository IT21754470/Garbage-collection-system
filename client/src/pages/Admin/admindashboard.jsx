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
        <div className='bg-green-200'>
            <Navbar />
            <h1 className='text-4xl font-bold text-center absolute-top-15 h-16 '>Welcome to admin dashboard</h1>
            <img className='
       h-150 w-200 object-cover item-center'src={Single3} alt=""/>
         
          
        </div>
    );
};

export default AdminDashboard;
