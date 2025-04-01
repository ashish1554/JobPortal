import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useGetCompanyById from '../../hooks/useGetCompanyById'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/navbar'

const CompanySetUp = () => {

    const params=useParams()
    const navigate=useNavigate()
    useGetCompanyById(params.id)


    const [input, setInput] = useState({
        name:'',
        description:'',
        website:'',
        location:'',
        file:null
    })


    const {singleCompany}=useSelector(store=>store.company)

   
    
    const changeEventHandler=(e)=>{
        setInput({...input, [e.target.name]: e.target.value })
    }
    
    const changeFileHandler=(e)=>{
        setInput({...input, file: e.target.files[0] })
    }

    const submitHandler=async(e)=>{
        e.preventDefault()
        // console.log(input)
        const formData=new FormData()
        formData.append('name', input.name)
        formData.append('description', input.description)
        formData.append('website', input.website)
        formData.append('location', input.location)
        if(input.file)
        {
        formData.append('file', input.file)
        }

        try{
            const res=await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formData,
                {
                    headers:{
                        "Content-Type":"multipart/form-data"
                    },
                    withCredentials:true,
                }
            )
            if(res.data.success)
            {
                toast.success(res.data.message);
                navigate('/admin/companies')
            }
        }
        catch(error){
            console.error(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
      setInput(
        {
        name:singleCompany.name||'',
        description:singleCompany.description||'',
        website:singleCompany.website||'',
        location:singleCompany.location||'',
        file:singleCompany.file||null,
        })
    
    }, [singleCompany])


    // useEffect(() => {
    //     console.log("Redux Store singleCompany:", singleCompany); // Debug log
    //     if (singleCompany && Object.keys(singleCompany).length > 0) {
    //         setInput({
    //             name: singleCompany.name || '',
    //             description: singleCompany.description || '',
    //             website: singleCompany.website || '',
    //             location: singleCompany.location || '',
    //             file: null, // File should not be auto-filled
    //         });
    //     }
    // }, [singleCompany]);
    
    

  return (
    <div>
        <Navbar />
        <div className='max-w-xl mx-auto my-10'>
            <form onSubmit={submitHandler} action="">
                <div className='flex items-center gap-5 p-8'>
                <button onClick={()=>navigate('/admin/companies')} className='flex items-center gap-2 text-gray-800 font-semibold bg-gray-100 rounded-lg border-2 px-4 py-2 hover:bg-gray-200'>
                <i className="fa-solid fa-backward"></i>
                    <span>Back</span>
                </button>
                <h1 className='font-bold text-xl'>Company Setup</h1>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="">Company Name</label>
                        <input type="text" name='name' value={input.name} onChange={changeEventHandler} className='w-full border-2 px-4 py-2 rounded-lg' />
                    </div>
                    <div>
                        <label htmlFor="">Descreption</label>
                        <input type="text" name='description' value={input.description} onChange={changeEventHandler} className='w-full border-2 px-4 py-2 rounded-lg' />
                    </div>
                    <div>
                        <label htmlFor="">Website</label>
                        <input type="text" name='website' value={input.website} onChange={changeEventHandler} className='w-full border-2 px-4 py-2 rounded-lg' />
                    </div>
                    <div>
                        <label htmlFor="">Location</label>
                        <input type="text" name='location' value={input.location} onChange={changeEventHandler} className='w-full border-2 px-4 py-2 rounded-lg' />
                    </div>
                    <div>
                        <label htmlFor="">Logo</label>
                        <input type="file" accept='image/*'  onChange={changeFileHandler} className='w-full border-2 px-4 py-2 rounded-lg' />
                    </div>
                </div>
                <button type='submit' className='bg-primary rounded-lg px-4 py-2 font-semibold text-white w-full mt-8'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default CompanySetUp