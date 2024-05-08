import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-200 p-6">
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-1 gap-8">
        <div>
          <h1 className="w-full text-3xl font-bold text-[#00df9a]">Eco Pick</h1>
          <p className="py-3">
            The UN General Assembly designated 5 June as World Environment Day, marking the first day of the Stockholm Conference on the Human Environment. Another resolution, adopted by the General Assembly the same day, led to the creation of UNEP.
          </p>
          <div className="flex justify-between md:w-[70%] my-6">
            <FaDribbbleSquare size={35} />
            <FaFacebookSquare size={35} />
            <FaInstagram size={35} />
            <FaTwitterSquare size={35} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// To ensure the footer sticks to the bottom, we can set the parent container (like `App`) to flex with `flex-col` and `min-h-screen`.
