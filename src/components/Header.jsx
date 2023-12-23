import { useState} from 'react'
import { Link } from 'react-router-dom'
import Moov_Logo from '../assets/Moov_Logo.svg'
import Search from '../assets/search.png'

const Header = () => {
  
  return (
    <div className=' w-[80%] flex items-center   justify-between  gap-10 py-10 max-w-[1300px] mx-auto'>
        <div>
           <Link to={'/'}> <img src={Moov_Logo} className='w-72' alt="Moov Logo" /></Link>
        </div>
        <div className='bg-white p-2 border-2 border-black rounded-xl hover:p-4 duration-300'>
           <Link to={'/search'}> <img src={Search} className='w-5 ' alt="Search" /></Link>
        </div>
        
    </div>
  )
}

export default Header