// PickupForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PickupForm = ({ pickup }) => {
  
  const [formData, setFormData] = useState({
    lane: pickup ? pickup.lane : '',
    date: pickup ? pickup.date : '',
    time: pickup ? pickup.time : ''
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
      const response = await fetch(`/api/pickup/update/${pickup._id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update pickup');
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
        <h1 className="text-4xl font-bold text-center">Create Schedule</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="lane" className="text-lg mb-2">Lane</label>
            <select id="lane" value={formData.lane} onChange={handleChange} className="p-2 border border-gray-300 rounded-md">
              <option value="">Select Lane</option>
              <option value="Lane A">Lane A</option>
              <option value="Lane B">Lane B</option>
              <option value="Lane C">Lane C</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="date" className="text-lg mb-2">Date</label>
            <input type="date" id="date" value={formData.date} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="time" className="text-lg mb-2">Time</label>
            <input type="time" id="time" value={formData.time} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
          </div>
          <form onSubmit={handleSubmit}>
      {/* Form fields for lane, date, and time */}
      <button type="submit">Update Schedule</button>
    </form>
        </form>
      </div>
    </div>
  );
};


export default PickupForm;
