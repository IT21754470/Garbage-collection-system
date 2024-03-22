import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PickupForm = () => {
  const [formData, setFormData] = useState({
    lane: '',
    date: '',
    time: '',
    selectedEmployee: '', // Add selectedEmployee state
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employee/get');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

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
          <div className="flex flex-col mb-4">
            <label htmlFor="selectedEmployee" className="text-lg mb-2">Select Employee</label>
            <select id="selectedEmployee" value={formData.selectedEmployee} onChange={handleChange} className="p-2 border border-gray-300 rounded-md">
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp._id} value={emp._id}>{emp.name}</option>
              ))}
            </select>
          </div>
          <div className='space-x-[5px]'>
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Add Schedule</button>
            <button type="button" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"><Link to="/adminpickup">View Schedule</Link></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PickupForm;
