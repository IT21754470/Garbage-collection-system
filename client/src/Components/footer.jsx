import React from 'react'
import {
    FaDribbbleSquare,
    FaFacebookSquare,
    FaGithubSquare,
    FaInstagram,
    FaTwitterSquare

} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className=' bottom-0 left-0 w-full   p-4'>
    <div className='max-w-[1600px] mx-auto  px-6 grid lg:grid-cols-1 gap-8 bg-slate-200 '>
        <div>
            <h1 className='w-full text-3xl font-bold text-[#00df9a] '>Eco Pick</h1>

            <p className='py-3 w-full'>The UN General Assembly designated 5 June as World Environment Day, marking the first day of the Stockholm Conference on the Human Environment. Another resolution, adopted by the General Assembly the same day, led to the creation of UNEP.</p>

            <div className='flex justify-between md:w-[70%] my-6'>
            <FaDribbbleSquare size={35}/>
            <FaFacebookSquare size={35}/>
            <FaGithubSquare size={35}/>
            <FaInstagram size={35}/>
            <FaTwitterSquare size={35}/>



            </div>
        </div>

        <div className='lg:col-span-3 flex justify-between'> 

       


        </div>
    
    </div>
    </footer>
  )
}

export default Footer