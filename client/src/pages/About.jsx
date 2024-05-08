import React from 'react';
import img from '../assets/About.jpg';

const AboutUs = () => {
  return (
    <div className="bg-white">
      <div className="section-container flex flex-col lg:flex-row"> {/* Two-column layout */}
        <div className="flex-1 relative"> {/* Allows for absolute positioning */}
          <img className="w-full h-[740px]" src={img} alt="About Us" /> {/* Full image width and height */}
          
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-500/60  text-center px-6"> {/* Centers the content */}
            <h1 className="font-bold text-6xl text-gray-100">About Us</h1>
            
            <div className="w-20 h-1 bg-green-500 my-3"></div> {/* Divider */}
            
            <div className="w-full max-w-lg space-y-6 "> 
              <p className="text-gray-100">
                EcoPick is a garbage collection system that has been serving the Kaluthara community for over 30 years. We specialize in sustainable solutions for waste management and pride ourselves on providing environmentally friendly services.
              </p>
              
              <p className="text-gray-100">
                We are committed to providing our customers with the best possible experience. If you have any questions or concerns, please feel free to contact us at any time!
              </p>
              
              <p className="text-gray-100">
                We hope you enjoy your experience with EcoPick!
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AboutUs;
