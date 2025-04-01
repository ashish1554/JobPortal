import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '../../redux/companySlice'
import Navbar from '../shared/navbar'
import CompaniesTabel from './CompaniesTabel'

const Companies = () => {
  useGetAllCompanies()
  const [input, setInput] = useState("")
  const navigate =useNavigate()
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input])
  
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
          <div className='flex items-center justify-between '>
          <input type="text"
            className='w-fit border-2 rounded-lg px-4 py-2'
            placeholder='Filter by name'
            onChange={(e)=>setInput(e.target.value)}
          />
          <button onClick={()=>navigate('/admin/companies/create')} className='bg-green-500 text-white font-semibold px-4 py-2 rounded-lg'>New Company</button>
          </div>
          <div className="container mx-auto p-6">
  <CompaniesTabel />
</div>

      </div>
    </div>
  )
}

export default Companies