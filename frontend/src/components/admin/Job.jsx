import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '../../redux/jobSlice'
import Navbar from '../shared/Navbar'
import AdminJobsTabel from './AdminJobsTabel'


const Job = () => {

  useGetAllAdminJobs()

  const [input, setInput] = useState("")
  const navigate =useNavigate()
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input])
  
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
          <div className='flex items-center justify-between '>
          <input type="text"
            className='w-fit border-2 rounded-lg px-4 py-2'
            placeholder='Filter By Name and Role'
            onChange={(e)=>setInput(e.target.value)}
          />
          <button onClick={()=>navigate('/admin/jobs/create')} className='bg-green-500 text-white font-semibold px-4 py-2 rounded-lg'>New Jobs</button>
          </div>
          <div className="container mx-auto p-6">
        <AdminJobsTabel />
</div>

      </div>
    </div>
  )
}

export default Job