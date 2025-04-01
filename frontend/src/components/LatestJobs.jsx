import React from 'react'
import { useSelector } from 'react-redux'
import LatestJobCards from './LatestJobCards'
import { useNavigate } from 'react-router-dom'

// const randomJobs=[1,2,3,4,5,6,7,8]
const LatestJobs = () => {
  const navigate=useNavigate()
  const {allJobs}=useSelector(store=>store.job)
  return (
    <div className=' mx-auto my-20 max-w-7xl'>
      <h1 className='font-bold text-4xl text-purple-700'>Latest & Top<span className='text-black'> Job Openings</span></h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {
          allJobs.length<=0 ?<span className='text-gray-700'>No Jobs Availabel</span>:allJobs.slice(0,6).map((job)=><LatestJobCards key={job._id} job={job}  />)
        }
      </div>
     
    </div>
  )
}

export default LatestJobs