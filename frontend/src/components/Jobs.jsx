import { motion } from "framer-motion"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FilterCard from './FilterCard'
import Job from './Job'
import Navbar from './shared/Navbar'

// const jobsArray=[1,2,3,4,5,6,7,8]
const Jobs = () => {
    const {allJobs,searchedQuery}=useSelector(store=>store.job)

    const [filterJobs, setFilterJobs] = useState(allJobs)

    useEffect(() => {
        console.log(searchedQuery)
        if(searchedQuery)
        {
            const filteredJobs=allJobs.filter((job)=>{
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase())
                || job.description.toLowerCase().includes(searchedQuery.toLowerCase())
                || job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        }
        else{
            setFilterJobs(allJobs)
        }
    }, [allJobs,searchedQuery])

    // useEffect(() => {
    //     console.log("🔹 Searched Query from Redux:", searchedQuery);
    //     console.log("🔹 All Jobs from Redux:", allJobs);
    
    //     if (searchedQuery) {
    //         const filteredJobs = allJobs.filter((job) => {
    //             console.log("Checking job:", job); // Check each job object
    //             return (
    //                 (job.title && job.title.toLowerCase().includes(searchedQuery.toLowerCase())) ||
    //                 (job.description && job.description.toLowerCase().includes(searchedQuery.toLowerCase())) ||
    //                 (job.location && job.location.toLowerCase().includes(searchedQuery.toLowerCase()))
    //             );
    //         });
    
    //         console.log("✅ Filtered Jobs:", filteredJobs);
    //         setFilterJobs(filteredJobs);
    //     } else {
    //         console.log("🔄 Resetting to all jobs.");
    //         setFilterJobs(allJobs);
    //     }
    // }, [allJobs, searchedQuery]);
    
    
    

  return (
    <div>
        <Navbar />
        <div className='max-w-7xl mx-auto mt-5'>
            <div className='flex gap-5'>
            <div className='w-20%'>
                <FilterCard />
            </div>
            {
                filterJobs.length<=0 ? <span>Job Not Found</span>
                :<div className='flex-1 h-[80vh] overflow-y-auto pb-5'> 
                    <div className='grid grid-cols-3 gap-40 ml-3'>
                        {
                            filterJobs.map((job)=>(
                                <motion.div
                                initial={{opacity:0,x:100}}
                                animate={{opacity:1,x:0}}
                                transition={{duration:0.5}}
                                exit={{opacity:0,x:100}}
                                key={job?._id}>
                                    <Job job={job} />
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            }
            </div>
        </div>
    </div>
  )
}

export default Jobs