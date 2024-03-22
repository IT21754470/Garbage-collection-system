import React, { useState } from 'react';
import { FaArrowLeft, FaUser, FaHome } from 'react-icons/fa';
import Bin from '../assets/bin.png';

export default function Table() {
  const [formData, setFormData] = useState({
    garbagetype: '',
    estimatedsize: ''
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
    <div className="flex items-center justify-center mt-10">
      <div>
        <div><FaArrowLeft /></div>
        <div className="h-[400px] w-[1000px] bg-gradient-to-r from-green-400 to-green-400 via-white">
          <div className="flex items-center justify-center mt-4"></div>
          <h1 className="text-2xl font-serif ml-8 mt-4">Select the garbage type</h1>
          <div className="flex justify-center items-center">
            <div className="mt-10 h-[220px] w-[800px] bg-slate-50">
              <div className="flex gap-5 justify-center items-center">
                <div>
                  <img className="w-10 h-10 mt-4 bg-white" src={Bin} alt="" />
                  <button className={`bg-green-200 w-20 h-8 mt-3 rounded-xl ml-2 ${formData.garbagetype === 'Type A' ? 'bg-green-500' :'hover:bg-green-300'}`} onClick={() => handleChange({ target: { id: 'garbagetype', value: 'Type A' } })}>Type A</button>
                </div>
                <div>
                  <img className="w-10 h-10 mt-4 bg-white" src={Bin} alt="" />
                  <button className={`bg-green-200 w-20 h-8 mt-3 rounded-xl ml-2 ${formData.garbagetype === 'Type B' ? 'bg-green-500' :'hover:bg-green-300'}`} onClick={() => handleChange({ target: { id: 'garbagetype', value: 'Type B' } })}>Type B</button>
                </div>
                <div>
                  <img className="w-10 h-10 mt-4 bg-white" src={Bin} alt="" />
                  <button className={`bg-green-200 w-20 h-8 mt-3 rounded-xl ml-2 ${formData.garbagetype === 'Type C' ? 'bg-green-500' :'hover:bg-green-300'}`} onClick={() => handleChange({ target: { id: 'garbagetype', value: 'Type C' } })}>Type C</button>
                </div>
                <div>
                  <img className="w-10 h-10 mt-4 bg-white" src={Bin} alt="" />
                  <button className={`bg-green-200 w-20 h-8 mt-3 rounded-xl ml-2 ${formData.garbagetype === 'Type D' ? 'bg-green-500' :'hover:bg-green-300'}`} onClick={() => handleChange({ target: { id: 'garbagetype', value: 'Type D' } })}>Type D</button>
                </div>
              </div>
              <h1 className="text-2xl font-serif ml-8 mt-4">Estimated size</h1>
              <div className="flex gap-5 justify-center items-center">
                <div><button className={`bg-green-200 w-20 h-8 mt-3 rounded-xl ml-2 ${formData.estimatedsize === 'XL' ? 'bg-green-500' :'hover:bg-green-300'}`} onClick={() => handleChange({ target: { id: 'estimatedsize', value: 'XL' } })}>XL</button></div>
                <div><button className={`bg-green-200 w-20 h-8 mt-3 rounded-xl ml-2 ${formData.estimatedsize === 'Large' ? 'bg-green-500' :'hover:bg-green-300'}`} onClick={() => handleChange({ target: { id: 'estimatedsize', value: 'Large' } })}>Large</button></div>
                <div><button className={`bg-green-200 w-20 h-8 mt-3 rounded-xl ml-2 ${formData.estimatedsize === 'Medium' ? 'bg-green-500' :'hover:bg-green-300'}`} onClick={() => handleChange({ target: { id: 'estimatedsize', value: 'Medium' } })}>Medium</button></div>
                <div><button className={`bg-green-200 w-20 h-8 mt-3 rounded-xl ml-2 ${formData.estimatedsize === 'Small' ? 'bg-green-500' :'hover:bg-green-300'}`} onClick={() => handleChange({ target: { id: 'estimatedsize', value: 'Small' } })}>Small</button></div>
              </div>
              <div></div>
            </div>
          </div>
          <button onClick={handleSubmit} className="bg-slate-700 text-white w-32 h-15 mt-8 rounded-xl ml-[800px] uppercase hover:opacity-95 disabled:opacity-80">Submit Approval</button>
        </div>
        <div className="flex gap-4 mt-4 text-2xl">
          <FaUser />
          <FaHome />
        </div>
      </div>
    </div>
  );
}
