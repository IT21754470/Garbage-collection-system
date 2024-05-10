import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({ employee }) => {
  const [formData, setFormData] = useState({
    name: '',
    NIC: '',
    contactno: '',
    email: '',
    _id:''
  });
  useEffect(() => {
    if (employee) {
    
      setFormData({
        name: employee.name || '',
       
        NIC: employee.NIC || '',
        contactno: employee.contactno || '',
        email: employee.email || ''
      });
    }
  }, [employee]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    let formattedValue = value;
  
    
  
  
    setFormData({
      ...formData,
      [id]: formattedValue
    });
  };
  
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!employee) {
      console.error("employee object is undefined");
      return;
    }
  
    try {
      const response = await fetch(`/api/employee/updates/${employee._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      
  
      if (!response.ok) {
        throw new Error('Failed to update employee');
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
        <h1 className="text-4xl font-bold text-center">Update Employee</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
          
            <label htmlFor="name" className="text-lg mb-2">Name</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="NIC" className="text-lg mb-2">NIC</label>
            <input type="text" id="date" value={formData.NIC} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="flex flex-col mb-4">
  <label htmlFor="contactno" className="text-lg mb-2">ContactNo</label>
  <input type="number" id="contactno" value={formData.contactno} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
</div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-lg mb-2">Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Update Employee</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
