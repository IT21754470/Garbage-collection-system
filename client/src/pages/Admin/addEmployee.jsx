import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    NIC: '',
    contactno: '',
    email: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/employee/create', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create employee');
      }
  
      
      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error(error);

    }
  };

  return (
    <div className="w-full md:w-[900px] px-4 mx-auto">
      <div className="bg-swhite-950 rounded-2xl mt-4 px-6 py-6">
        <h1 className="text-4xl font-bold text-center">Add Employee</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="text-lg mb-2">Name</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="NIC" className="text-lg mb-2">NIC</label>
            <input type="text" id="NIC" value={formData.NIC} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="contactno" className="text-lg mb-2">ContactNo</label>
            <input type="number" id="contactno" value={formData.contactno} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-lg mb-2">Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
          </div>
          <div className='space-x-[5px]'>
          <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Add Employee</button>
          <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"> <Link to="/addemployeedashboard">view employee</Link></button>
       </div>
        </form>
      </div>
    </div>
  );
};


export default EmployeeForm;
