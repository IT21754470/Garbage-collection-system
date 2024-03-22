import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Picker from '../assets/picker2.jpg';
const PickupTable = () => {
  const [pickups, setPickups] = useState([]);
  const [selectedLane, setSelectedLane] = useState('');

  useEffect(() => {
    fetchPickups();
  }, []);

  const fetchPickups = async () => {
    try {
      const response = await axios.get('/api/pickup/get');
      setPickups(response.data);
    } catch (error) {
      console.error('Error fetching pickups:', error);
    }
  };

  const handleLaneChange = (e) => {
    setSelectedLane(e.target.value);
  };

  
  const filteredPickups = selectedLane ? pickups.filter(pickup => pickup.lane === selectedLane) : pickups;

  return (
    <div className="w-full md:w-[900px] px-4 mx-auto">
      <div className="bg-swhite-950 rounded-2xl mt-4 px-6 py-6">
        <h1 className="text-4xl font-bold text-center">Pickup Details</h1>
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-gray-300  '>
        <img className='w-full h-[300px]'  src={Picker} alt="Contact Us" />
            <h1 className='text-xl font-bold'>Hi! User </h1>
            <h3>You can see which time our employee visits you.Be ready According to this schedule.If you have 
              special Requests you can select our special request page.We expect your involvment for the garbage pickup management.Thank you!</h3>
              </div>
        <div className="mb-4">
          <label htmlFor="lane" className="block text-lg mb-2">Select Lane</label>
          <select id="lane" value={selectedLane} onChange={handleLaneChange} className="p-2 border border-gray-300 rounded-md">
            <option value="">All Lanes</option>
            <option value="Lane A">Lane A</option>
            <option value="Lane B">Lane B</option>
            <option value="Lane C">Lane C</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 w-full rounded-md">
            <thead className="bg-green-300 text-slate-700">
              <tr>
                <th className="py-3 px-6 text-left">Lane</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredPickups.map((pickup, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : ''}>
                  <td className="py-3 px-6">{pickup.lane}</td>
                  <td className="py-3 px-6">{pickup.date}</td>
                  <td className="py-3 px-6">{pickup.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PickupTable;
