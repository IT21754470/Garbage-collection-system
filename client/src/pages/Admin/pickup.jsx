import React, { useState } from 'react';

const PickupForm = () => {
  const [formData, setFormData] = useState({
    lane: '',
    date: '',
    time: ''
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
      const response = await fetch('/api/pickup/create', {
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
          <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Add Schedule</button>
        </form>
      </div>
    </div>
  );
};


export default PickupForm;
