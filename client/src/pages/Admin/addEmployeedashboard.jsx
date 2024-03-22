import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EmployeePage from './employeePage';
const EmployeeTable = () => {
  const [employee, setEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get('/api/employee/get');
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/api/employee/deletes/${id}`);
      setEmployee(employee.filter(emp => emp._id !== id));
      setSelectedEmployee(null);
      console.log('Employee deleted:', id);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="w-full md:w-[900px] px-4 mx-auto">
      <div className="bg-swhite-950 rounded-2xl mt-4 px-6 py-6">
        <h1 className="text-4xl font-bold text-center">Employee Details</h1>
        <div className="overflow-x-auto">
          <table className="border border-gray-300 w-full rounded-md">
            <thead className="bg-yellow-300 text-slate-700">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">NIC</th>
                <th className="py-3 px-6 text-left">ContactNo</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((emp, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : ''}>
                  <td className="py-3 px-6">{emp.name}</td>
                  <td className="py-3 px-6">{emp.NIC}</td>
                  <td className="py-3 px-6">{emp.contactno}</td>
                  <td className="py-3 px-6">{emp.email}</td>
                  <td className="py-3 px-6">
                  <div className='space-y-[5px]'>
                    <button onClick={() => handleEditClick(emp)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full">
                      Update
                    </button>
                    <button onClick={() => handleDeleteClick(emp._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full">
                      Delete
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
               </tbody>
          </table>
                {selectedEmployee && <EmployeePage employee={selectedEmployee} />}
            
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
