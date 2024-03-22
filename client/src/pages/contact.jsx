import React from 'react';
import bgpic from '../assets/contact.jpg';
import home from '../assets/home.png';

const Contact = () => {
  return (
    <div className='grid md:grid-cols-2 gap-8 items-center'>
      {/* Right Section (Boxes) */}
      <div className='flex flex-col items-center'>
        <div className='text-4xl font-bold text-center mt-8'>
          Contact Us
        </div>
        
        <div className='text-center my-4'>
          <h1 className='text-xl font-medium text-green-500'>You can contact us for your problems. Share anytime! Use our contact details to contact us.</h1>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-gray-300'>
            <h2 className='text-2xl font-bold text-center py-8'>Visit Us</h2>
            <img className='w-20 mx-auto mt-[-1rem] bg-white' src={home} alt="Contact Us" />
            <h1 className='text-sm font-bold text-center py-8'>You can come to see us and communicate with us. Please make sure to get an appointment before visiting us.</h1>
          </div>

          <div className='bg-gray-100 shadow-2xl flex flex-col p-4 my-8 rounded-lg hover:scale-105 duration-300'>
            <h2 className='text-2xl font-bold text-center py-8'>Special Requests</h2>
          </div>

          <div className='shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-gray-300'>
            <h2 className='text-2xl font-bold text-center py-8'>Community</h2>
          </div>
        </div>
      </div>
      
   
      <div>
        <img className='w-full h-auto' src={bgpic} alt="Contact Us" />
      </div>
    </div>
  );
};

export default Contact;
