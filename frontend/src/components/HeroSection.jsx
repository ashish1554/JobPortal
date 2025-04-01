import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../redux/jobSlice';

const HeroSection = () => {
  const [query, setQuery] = useState("");

  const dispatch=useDispatch()
  const navigate=useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5'>
            <h1 className='text-red-500 text-1xl font-semibold'>JOB PORTAL WEBSITE</h1>
            <p className='text-gray-800 font-bold text-5xl'>Search,Apply & <br /> Get Your <span className='text-purple-700'>Dream Jobs</span></p>
            <p>Find your dream job with ease! Explore top opportunities, connect with recruiters, and kickstart your career today</p>
            <div>
            <input onChange={(e)=>setQuery(e.target.value)} type="text" placeholder='Find your dream jobs' className='w-[40%] -mr-20 bg-white outline-none border-2 rounded-full rounded-r-full px-3 py-2 shadow-lg' />
            <button onClick={searchJobHandler} className='bg-primary text-white font-semibold rounded-full ml-2 px-3 py-2'>Search</button>
            </div>
        </div>
    </div>
  )
}

export default HeroSection