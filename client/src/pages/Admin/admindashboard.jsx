/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../Components/Navbar';

const AdminDashboard = () => {
    const isAdmin = useSelector(state => state.user.isAdmin);
    const navigate = useNavigate(); 

   

    return (
        <div>
            <Navbar />
          
        </div>
    );
};

export default AdminDashboard;
