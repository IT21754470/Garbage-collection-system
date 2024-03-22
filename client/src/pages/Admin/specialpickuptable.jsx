import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpecialPickupTable = () => {
  const [specialPickups, setSpecialPickups] = useState([]);

  useEffect(() => {
    fetchSpecialPickups();
  }, []);

  const fetchSpecialPickups = async () => {
    try {
      const response = await axios.get('/api/specialpickup/gets');
      setSpecialPickups(response.data);
    } catch (error) {
      console.error('Error fetching special pickups:', error);
    }
  };

  const handleAccept = async (id, index) => {
    try {
      await axios.post(`/api/specialpickup/accept/${id}`);
      const updatedSpecialPickups = [...specialPickups];
      updatedSpecialPickups[index].accepted = true;
      updatedSpecialPickups[index].rejected = false;
      setSpecialPickups(updatedSpecialPickups);
    } catch (error) {
      console.error('Error accepting special pickup:', error);
    }
  };

  const handleReject = async (id, index) => {
    try {
      await axios.post(`/api/specialpickup/reject/${id}`);
      const updatedSpecialPickups = [...specialPickups];
      updatedSpecialPickups[index].accepted = false;
      updatedSpecialPickups[index].rejected = true;
      setSpecialPickups(updatedSpecialPickups);
    } catch (error) {
      console.error('Error rejecting special pickup:', error);
    }
  };

  return (
    <div className="w-full md:w-[900px] px-4 mx-auto">
      <div className="bg-swhite-950 rounded-2xl mt-4 px-6 py-6">
        <h1 className="text-4xl font-bold text-center">Special Pickup Requests</h1>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 w-full rounded-md">
            <thead className="bg-green-300 text-slate-700">
              <tr>
                <th className="py-3 px-6 text-left">Garbage Type</th>
                <th className="py-3 px-6 text-left">Estimated Size</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {specialPickups.map((pickup, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : ''}>
                  <td className="py-3 px-6">{pickup.garbagetype}</td>
                  <td className="py-3 px-6">{pickup.estimatedsize}</td>
                  <td>
                    <button
                      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${pickup.accepted ? 'bg-green-500' : ''}`}
                      onClick={() => handleAccept(pickup._id, index)}
                      disabled={pickup.accepted || pickup.rejected}
                    >
                      {pickup.accepted ? 'Accepted' : 'Accept'}
                    </button>
                    <button
                      className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ${pickup.rejected ? 'bg-green-500' : ''}`}
                      onClick={() => handleReject(pickup._id, index)}
                      disabled={pickup.rejected || pickup.accepted}
                    >
                      {pickup.rejected ? 'Rejected' : 'Reject'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SpecialPickupTable;
