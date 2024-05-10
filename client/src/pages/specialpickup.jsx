import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaUser, FaHome } from 'react-icons/fa';
import Bin from '../assets/bin.png';

export default function Table() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [formData, setFormData] = useState({
    garbagetype: '',
    estimatedsize: '',
    date: '',
    location: '',
    userId: currentUser?._id || '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
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
    <div className="flex items-center justify-center mt-10 bg-green-100 min-h-screen">
      <div className="w-full md:w-[1200px] lg:w-[800px] bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between mb-8">
          <FaArrowLeft className="text-gray-600 cursor-pointer hover:text-gray-900" />
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Garbage Collection Request</h1>
        </div>

  
        <h2 className="text-lg font-medium text-gray-700">Select the garbage type</h2>
        <div className="flex gap-6 justify-center my-4">
          {['Type A', 'Type B', 'Type C', 'Type D'].map((type) => (
            <div key={type} className="flex flex-col items-center">
              <img className="w-10 h-10 bg-white" src={Bin} alt={type} />
              <button
                className={`bg-green-200 w-24 h-10 rounded-lg ${formData.garbagetype === type ? 'bg-green-500' : 'hover:bg-green-300'}`}
                onClick={() => handleChange({ target: { id: 'garbagetype', value: type } })}
              >
                {type}
              </button>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-medium text-gray-700 mt-6">Estimated size</h2>
        <div className="flex gap-6 justify-center my-4">
          {['XL', 'Large', 'Medium', 'Small'].map((size) => (
            <button
              key={size}
              className={`bg-green-200 w-24 h-10 rounded-lg ${formData.estimatedsize === size ? 'bg-green-500' : 'hover:bg-green-300'}`}
              onClick={() => handleChange({ target: { id: 'estimatedsize', value: size } })}
            >
              {size}
            </button>
          ))}
        </div>

      
        <div className="mt-6 space-y-6">
          <div>
            <label htmlFor="date" className="block text-gray-700">Final Date</label>
            <input
              className="w-full bg-white rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-gray-700">Location</label>
            <input
              className="w-full bg-white rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              id="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white w-40 h-12 rounded-xl uppercase hover:bg-green-600 transition"
          >
            Submit Approval
          </button>
        </div>

       
      </div>
    </div>
  );
}
