// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import useGetAllJobs from '../hooks/useGetAllJobs'
// import { setSearchedQuery } from '../redux/jobSlice'
// import Job from './Job'
// import Navbar from './shared/Navbar'

// const randomJobs = [1,2,3]
// const Browse = () => {
//   useGetAllJobs()
//   const {allJobs}=useSelector(store=>store.job)
//   const dispatch=useDispatch()
//   useEffect(() => {
//     return ()=>{
//       // cleanup function
//       dispatch(setSearchedQuery(""))
//     }
//   }, [])
  
//   return (
//     <div>
//         <Navbar />
//         <div className='p-5'>
//             <h1 className='font-bold text-2xl'>Search Result <span className='text-primary'>({allJobs.length})</span></h1>
//                 <div className='grid grid-cols-3 gap-5 mx-10 my-2'>
//                     {
//                         allJobs.map((job,index)=>
//                           {
//                            return(<Job key={job._id}  job={job} />)
//                           })
//                     }
//                 </div>
//         </div>
//     </div>
//   )
// }

// export default Browse


// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import useGetAllJobs from '../hooks/useGetAllJobs'
// import { setSearchedQuery } from '../redux/jobSlice'
// import Job from './Job'
// import Navbar from './shared/Navbar'

// const Browse = () => {
//   useGetAllJobs()
//   const { allJobs } = useSelector(store => store.job)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     return () => {
//       dispatch(setSearchedQuery(""))
//     }
//   }, [])

//   return (
//     <div>
//       <Navbar />
//       <div className="p-4 md:p-6">
//         <h1 className="font-bold text-2xl mb-4">
//           Search Result <span className="text-primary">({allJobs.length})</span>
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {allJobs.map((job) => (
//             <Job key={job._id} job={job} />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Browse


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; // 🔑
import useGetAllJobs from '../hooks/useGetAllJobs';
import { setSearchedQuery } from '../redux/jobSlice';
import FilterCard from './FilterCard'; // 🔑
import Job from './Job';
import Navbar from './shared/Navbar';

const Browse = () => {
  const location = useLocation(); // ✅ get current route
  useGetAllJobs();

  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div>
      <Navbar />

      <div className="p-4">
        <h1 className="font-bold text-2xl">
          Search Results <span className="text-primary">({allJobs.length})</span>
        </h1>

        {/* ✅ Only show FilterCard if on `/job` route */}
        {location.pathname === '/job' && (
          <div className="mt-4 mb-8">
            <FilterCard />
          </div>
        )}

        {/* ✅ Job Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
