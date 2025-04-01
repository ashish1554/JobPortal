import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setSingleCompany } from '../../redux/companySlice'
import { COMPANY_API_END_POINT } from '../../utils/constant'

const CompanyCreate = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [companyName, setCompanyName] = useState()

    const registerNewCompany=async()=>{
        try{
            const res=await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,
            })
            if(res.data.success)
            {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId=res.data.company._id
                navigate(`/admin/companies/${companyId}`)
            }
        }
        catch(error){
            console.log(error)
        }
    }

  return (
    <div>
        <Navbar />
        <div className='max-w-4xl mx-auto'>
            <div className='my-10'>
            <h1 className='font-bold text-2xl'>Your Company</h1>
            <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
            </div>
            <button>Company Name</button>
            <br />
            <input onChange={(e)=>setCompanyName(e.target.value)} type="text" className='my-2 w-full border-2 rounded-lg px-2 py-1' placeholder='JobHunt,MicroSoft etc' />
            <div className='flex items-center gap-2 my-10'>
                <button onClick={()=>navigate('/admin/companies')} className='bg-white text-black font-semibold px-4 py-2 border-2 rounded-lg'>Cancel</button>
                <button onClick={registerNewCompany} className='bg-black text-white font-semibold px-4 py-2 border-2 rounded-lg'>Continue</button>
            </div>
        </div>  
    </div>
  )
}

export default CompanyCreate