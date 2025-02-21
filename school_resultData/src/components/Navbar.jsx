import React, { useContext, useState } from 'react'
import acadd from '../assets/acadd.jpg'
import { NavLink, useNavigate } from 'react-router-dom'


const Navbar = () => {

    const navigate = useNavigate()


  return (
    <div className='flex items-center justify-between 
                    text-sm py-4 border-b 
                    border-b-gray-400'>
      <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={acadd.jpg} alt="" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
       
            
         
      
      </ul>
      <div className='flex items-center gap-4'>

            <NavLink to='/'>
                <li className='py-1 px-5'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto' hidden />
            </NavLink>
     
      </div>
    </div>
  )
}


export default Navbar
