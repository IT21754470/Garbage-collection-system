/* eslint-disable no-unused-vars */
import React from 'react'
import {useSelector} from 'react-redux';
import Single from "../assets/shed.jpg"
import Single2 from "../assets/garbage.jpeg"
import Single3 from "../assets/community.jpeg"


export default function Home() {
  const {currentUser,loading,error}=useSelector((state)=> state.user)
  console.log(currentUser)
  console.log(currentUser?.isAdmin)

    return (
      <div className='w-full py-[10rem] px-4 bg-white'>
  
          <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
  
              <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-40 mx-auto mt-[-3rem] bg-white'src={Single} alt=""/>
  
                  <h2 className='text-2xl font-bold text-center py-8'>Pickup Schedule</h2>
              
             
                  <button className='bg-[#00df9a] text-black rounded-md font-medium w-[200px]  my-6 mx-auto px-6 py-3 '>Join</button>
              </div>
              <div className='bg-gray-100 w-full shadow-2xl flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              
              <img className='w-40 mx-auto mt-[-3rem] bg-white'src={Single2} alt=""/>
                  <h2 className='text-2xl font-bold text-center py-8'>Special Requests</h2>
                 
                  <button className='bg-black text-[#00df9a] rounded-md font-medium w-[200px]  my-6 mx-auto px-6 py-3 '>Join</button>
              </div>
  
              <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-40 mx-auto mt-[-3rem] bg-white'src={Single3} alt=""/>
  
                  <h2 className='text-2xl font-bold text-center py-8'>Community</h2>
                  
                  <button className='bg-[#00df9a] text-black rounded-md font-medium w-[200px]  my-6 mx-auto px-6 py-3 '>Join</button>
              </div>
  
          </div>
  
  
  
  
      </div>
    )
  }
  
