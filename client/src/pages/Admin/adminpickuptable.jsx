import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PickupForm from './adminPickupPage';
import { Link } from 'react-router-dom';

const AdminPickupTable = () => {
  const [pickups, setPickups] = useState([]);
  const [selectedLane, setSelectedLane] = useState('');
  const [selectedPickup, setSelectedPickup] = useState(null); // Add selectedPickup state
  useEffect(() => {
    fetchPickups();
  }, []);

  const fetchPickups = async () => {
    try {
      const response = await axios.get('/api/pickup/get');
      console.log('Fetched pickups:', response.data); // Add this line
      setPickups(response.data);
    } catch (error) {
      console.error('Error fetching pickups:', error);
    }
  };

  const handleLaneChange = (e) => {
    setSelectedLane(e.target.value);
  };

  const handleEditClick = (pickup) => {
    setSelectedPickup(pickup);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/api/pickup/deletes/${id}`);
  
      setPickups(pickups.filter(pickup => pickup._id !== id));
      setSelectedPickup(null);
      console.log('Pickup deleted:', id);
    } catch (error) {
      console.error('Error deleting pickup:', error);
    }
  };
  

  
  const filteredPickups = selectedLane ? pickups.filter(pickup => pickup.lane === selectedLane) : pickups;

  return (
    <div className="w-full md:w-[900px] px-4 mx-auto">
      <div className="bg-swhite-950 rounded-2xl mt-4 px-6 py-6">
        <h1 className="text-4xl font-bold text-center">Pickup Details</h1>
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
            <thead className="bg-yellow-300 text-slate-700">
              <tr>
                <th className="py-3 px-6 text-left">Lane</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Time</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th> {/* Added Actions column */}
              </tr>
            </thead>
            <tbody>
              {filteredPickups.map((pickup, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : ''}>
                  <td className="py-3 px-6">{pickup.lane}</td>
                  <td className="py-3 px-6">{pickup.date}</td>
                  <td className="py-3 px-6">{pickup.time}</td>
                  <td className="py-3 px-6">{pickup.status}</td> {/* Assuming status is available */}
                  <td>
                    <button onClick={() => handleEditClick(pickup)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full">
                      Update
                    </button>
                    <button onClick={() => handleDeleteClick(pickup._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full">
                      Delete
                    </button>
                  </td>
                </tr>
                
              ))}
                </tbody>
          </table>
        </div>
              {selectedPickup && <PickupForm pickup={selectedPickup} />}
           
      </div>
    </div>
  );
};

export default AdminPickupTable;
