import React from 'react';
import img from '../assets/contact3.jpg';

const ContactUs = () => {
  return (
    <div className="bg-green-100">
      <div className="section-container flex flex-col lg:flex-row">
        <div className="flex-1">
          <img className="w-full h-[740px]" src={img} alt="Contact Us" />
        </div>

        <div className="flex-1 bg-green-100 p-20 flex flex-col items-center justify-center"> 
          <h2 className="text-5xl font-bold text-slate-700 items-center justify-center">Contact Us</h2>
          <div className="w-20 h-1 bg-green-500 my-3"></div>
          <p className="text-gray-600 mb-6"> {/* Increased bottom margin here */}
            We'd love to hear from you! Please fill out the form below, and we'll get back to you as soon as possible.
          </p>
          <form className="w-full max-w-2xl space-y-4"> {/* 'space-y-4' adds vertical space between children */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-3 border shadow-xl bg-simpleLightYellow text-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border shadow-xl bg-simpleLightYellow rounded-md text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full px-4 py-3 border shadow-xl bg-simpleLightYellow text-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
              rows="5"
              required
            ></textarea>

            <div className="text-center">
              <button
                type="submit"
                className="shadow-xl bg-green-500 text-base rounded-xl text-slate-700 px-8 py-3 hover:bg-yellow-400 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-gray-800">hello</div>
    </div>
  );
};

export default ContactUs;
