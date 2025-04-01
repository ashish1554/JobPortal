import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllJobs from '../hooks/useGetAllJobs'
import CategoryCarousel from './CategoryCarousel'
import Footer from './Footer'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Navbar from './shared/navbar'

const Home= () => {
  useGetAllJobs()
  const {user}=useSelector(store=>store.auth)
  const navigate=useNavigate()


  // useEffect(() => {
  //   if(user.role==='Recruiter')
  //   {
  //     navigate('/admin/companies')
  //   }
  // }, [])
  
  return (
    <div>
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <Footer />
    </div>
  )
}

export default Home