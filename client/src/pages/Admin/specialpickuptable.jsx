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
      <div className="bg-white rounded-2xl mt-4 px-6 py-6">
        <h1 className="text-4xl font-bold text-center">Special Pickup Requests</h1>
        <div className="overflow-x-auto w-full">
          <table className="border border-gray-300 rounded-md w-full table-layout-fixed">
            <thead className="bg-green-300 text-slate-700 w-full">
              <tr>
                <th className="py-3 px-6 w-1/5 text-left">Garbage Type</th>
                <th className="py-3 px-6 w-1/5 text-left">Estimated Size</th>
                <th className="py-3 px-6 w-1/5 text-left">Date</th>
                <th className="py-3 px-6 w-1/5 text-left">Location</th>
                <th className="py-3 px-6 w-1/5 text-left">Status</th>
                <th className="py-3 px-6 w-1/5 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {specialPickups.map((pickup, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : ''}>
                  <td className="py-3 px-6">{pickup.garbagetype}</td>
                  <td className="py-3 px-6">{pickup.estimatedsize}</td>
                  <td className="py-3 px-6">{pickup.date}</td>
                  <td className="py-3 px-6">{pickup.location}</td>
                  <td className="py-3 px-6">
                    {pickup.accepted ? (
                      <span className="text-green-600">Accepted</span>
                    ) : pickup.rejected ? (
                      <span className="text-red-600">Rejected</span>
                    ) : (
                      <span className="text-gray-600">Pending</span>
                    )}
                  </td>
                  <td className="py-3 px-6 flex gap-2">
                    <button
                      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${pickup.accepted || pickup.rejected ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleAccept(pickup._id, index)}
                      disabled={pickup.accepted || pickup.rejected}
                    >
                      Accept
                    </button>
                    <button
                      className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ${pickup.accepted || pickup.rejected ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleReject(pickup._id, index)}
                      disabled={pickup.accepted || pickup.rejected}
                    >
                      Reject
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
