import React, { useState } from 'react';
import img2 from '../assets/Contact3.jpg';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className='bg-white menu-background'>
      <div className='section-container'>
        <div className='flex flex-col md:flex-row-reverse justify-between items-stretch md:items-center gap-5'>

          <div className='md:w-2/3'>
            <img className='w-full h-[540px] rounded-xl' src={img2} alt="Contact Us" />
          </div>

          <div className='md:w-3/5 shadow-2xl bg-slate-200 p-4 rounded-2xl mt-8'>
            <h2 className='text-3xl font-semibold text-slate-700 mb-4'>Contact Us</h2>
            <p className='text-gray-600 mb-3'>
              We'd love to hear from you! Please fill out the form below, and we'll get back to you as soon as possible.
            </p>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Your Name'
                  className='w-full px-4 py-2 border shadow-xl bg-simpleLightYellow text-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
              <div className='space-y-2'>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Your Email'
                  className='w-full px-4 py-2 border shadow-xl bg-simpleLightYellow rounded-md text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400'
                  required
                />
              </div>
              <div className='space-y-2'>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Your Message'
                  className='w-full px-4 py-2 border shadow-xl bg-simpleLightYellow text-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400'
                  rows='5'
                  required
                ></textarea>
              </div>
              <div className='text-center'>
                <button
                  type='submit'
                  className='shadow-xl bg-yellow-300 text-base rounded-xl text-slate-700 px-8 py-3 hover:bg-yellow-400 transition duration-300'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
