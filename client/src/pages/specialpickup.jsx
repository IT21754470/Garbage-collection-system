import React, { useState, useEffect } from 'react';
import axios from 'axios';

const specialPickup= () => {
  const [pickups, setPickups] = useState([]);
  

  const [formData, setFormData] = useState({
    garbagetype: '',
    estimatedsize: '',
   
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
      const response = await fetch('/api/specialpickup/createspecial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create pickup');
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
      <h1 className="text-4xl font-bold text-center">make a special pickup request</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-4">
          <div className="flex flex-col mr-4">
            <label htmlFor="garbageType" className="text-lg mb-2">Garbage Type</label>
            <select id="garbagetype" value={formData.garbagetype} onChange={handleChange} className="p-2 border border-gray-300 rounded-md">

              <option value="">Select Garbage Type</option>
              <option value="Type A">Type A</option>
              <option value="Type B">Type B</option>
              <option value="Type C">Type C</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="estimatedSize" className="text-lg mb-2">Estimated Size</label>
            <select id="estimatedsize" value={formData.estimatedsize} onChange={handleChange} className="p-2 border border-gray-300 rounded-md">

              <option value="">Select Estimated Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Submit</button>

      </form>
     
    </div>
  </div>
  
   
  );
};

export default specialPickup;
