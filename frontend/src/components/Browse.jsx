import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { setSearchedQuery } from '../redux/jobSlice'
import Job from './Job'
import Navbar from './shared/navbar'

const randomJobs = [1,2,3]
const Browse = () => {
  useGetAllJobs()
  const {allJobs}=useSelector(store=>store.job)
  const dispatch=useDispatch()
  useEffect(() => {
    return ()=>{
      // cleanup function
      dispatch(setSearchedQuery(""))
    }
  }, [])
  
  return (
    <div>
        <Navbar />
        <div className='p-5'>
            <h1 className='font-bold text-2xl'>Search Result <span className='text-primary'>({allJobs.length})</span></h1>
                <div className='grid grid-cols-3 gap-5 mx-10 my-2'>
                    {
                        allJobs.map((job,index)=>
                          {
                           return(<Job key={job._id}  job={job} />)
                          })
                    }
                </div>
        </div>
    </div>
  )
}

export default Browse