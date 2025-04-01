import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setAllApplicants } from '../../redux/applicationSlice';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import Navbar from '../shared/navbar';
import ApplicantsTabel from './ApplicantsTabel';



const Applicants = () => {

  const params=useParams()
  const dispatch=useDispatch()
  const {applicants}=useSelector(store=>store.application)
  
  useEffect(() => {
    const fetchAllApplicants=async () => {
      try{
        const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            withCredentials: true
          }
        )
        console.log(res.data)
        // if(res.data.success)
        // {
        //     dispatch(setAllApplicants(res.data.job))
        // }
        dispatch(setAllApplicants(res.data.job))
      }
      catch(error){
        console.error('Error fetching applicants', error)
      }
    }
    fetchAllApplicants()
  }, [])
  
  return (
    <div>
        <Navbar />
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants({applicants.applications.length})</h1>
            <ApplicantsTabel />
        </div>
    </div>
  )
}

export default Applicants