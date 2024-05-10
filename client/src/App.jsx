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
import PickupTable from './pages/PickupTable';
import SpecialPickup from './pages/specialpickup';
import Specialpickuptable from './pages/Admin/specialpickuptable';
import AdminlPickup from './pages/Admin/adminpickuptable';
import PickupForm from './pages/Admin/adminPickupPage';
import AddEmployee from './pages/Admin/addEmployee';
import AddEmployeeDashboard from './pages/Admin/addEmployeedashboard';


import Contact from './pages/contact';
import NotificationBell from './Components/NotificationBell';
import Feed from './pages/feedback/Feedback';
import ADDFeed from './pages/feedback/Addfeedback';
import Update from './pages/feedback/UpdateFeed';


import FeedPage from "./pages/Employee/FeedPage";
import AddFeed from "./pages/Employee/AddFeed";
import FeedManage from "./pages/Admin/FeedManage";
import EditFeed from "./pages/Employee/EditFeed";

export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser?.isAdmin;


  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/bell" element={<NotificationBell />} />
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignOut />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/pickupTable" element={<PickupTable />} />
        <Route path="/specialpickup" element={<SpecialPickup />} />
        <Route path="/contact" element={<Contact/>}/>
  <Route path='/about' element={<About/>}/>
    
       <Route path="/feed" element={<Feed />} />
   

        <Route path="/Addfeedback" element={<ADDFeed />} />
      
      
        <Route path="/update/:feedbackId" element={<Update />} />
        {isAdmin ? (
          <>
            
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/pickup" element={<Pickup />} />
             <Route path="/specialpickupTable" element={<Specialpickuptable/>} />
             <Route path="/adminpickup" element={<AdminlPickup />} />
             <Route path="/addemployee" element={<AddEmployee/>}/>
             <Route path="/addemployeedashboard" element={<AddEmployeeDashboard/>}/>
           <Route path="/adminpickupform" element={<PickupForm />} />
          
           <Route path="/feed" element={<Feed />} />
           <Route path="/feeds" element={<FeedPage />} />
            <Route path="/feedmanage" element={<FeedManage />} />
          </>
        ) : (
         
          <>
          <Route path="/feeds" element={<FeedPage />} />
          <Route path="/addfeed" element={<AddFeed />} />
          <Route path="/feedmanage" element={<FeedManage />} />
          <Route path="/feed/edit/:id" element={<EditFeed />} />
        </>
          
        )}

     
      
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
