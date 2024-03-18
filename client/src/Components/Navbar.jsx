import React ,{useState} from 'react'
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'
import { Link } from 'react-router-dom';

const Navbar= ()=> {
    const [nav, setNav] = useState(true)


    const handleNav=()=>{
        setNav(!nav)
    }

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx auto px-3 text-black">


 
    
    <div onClick={handleNav} >
        {!nav ?<AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
   

    </div>
    <div className={!nav ? 'fixed left-0 top-20 w-[20%] h-full border-r border-r- gray-900 bg-slate-200 ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-50%]'}>
    <h1 className="w-full  text-3xl font-bold text-black m-4">Admin</h1>
    <ul className="uppercase p-4 text-black">
 
 <li className="p-4 border-b border-gray-600">Dashboard</li>
 <li className='p-4 border-b border-gray-600'>  <Link to="/users">All Users</Link></li>

 <li className='p-4 border-b border-gray-600'>Employee Management</li>
 <li className='p-4 '>Contact</li>
 
 </ul>
 
    </div>
    <ul>
 
    </ul>
     </div>
  )
}

export default Navbar