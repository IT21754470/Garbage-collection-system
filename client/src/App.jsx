/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignOut from './pages/SignOut';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import Header from './Components/Header';
import AdminDashboard from './pages/Admin/admindashboard';
import PrivateRoute from './Components/PrivateRoute';
import Users from './pages/Admin/users';
import {useSelector} from 'react-redux';
import Footer from './Components/footer';
import Pickup from './pages/Admin/pickup';
import PickupTable from './pages/pickupTable';
import SpecialPickup from './pages/specialpickup';
import Specialpickuptable from './pages/Admin/specialpickuptable';
import AdminlPickup from './pages/Admin/adminpickuptable';

export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser?.isAdmin;


  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignOut />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/pickupTable" element={<PickupTable />} />
        <Route path="/specialpickup" element={<SpecialPickup />} />
        
  
       <Route path="/pickup" element={<Pickup />} />
        {isAdmin ? (
          <>
            
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/pickup" element={<Pickup />} />
             <Route path="/specialpickupTable" element={<Specialpickuptable/>} />
             <Route path="/adminpickup" element={<AdminlPickup />} />
          </>
        ) : (
          <Route path="/admin-dashboard" element={<Navigate to="/" />} />
        )}

     
      
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
