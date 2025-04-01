import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { USER_API_END_POINT } from '../../utils/constant';
import Navbar from '../shared/Navbar';
const Signup = () => {
    const [input, setInput] = useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
    })

    const {user}=useSelector(store=>store.auth);

    const navigate=useNavigate()
  
    const changeEventHandler =(e)=>{
        setInput({...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler=(e)=>{
        setInput({...input, file: e.target.files?.[0] })
    }

    const submitHandler=async(e)=>{
        e.preventDefault()
        const formData=new FormData()
        formData.append('fullname', input.fullname)
        formData.append('email', input.email)
        formData.append('phoneNumber', input.phoneNumber)
        formData.append('password', input.password)
        formData.append('role', input.role)
        if(input.file)
        {
            formData.append('file', input.file)
        }
        // console.log(input)
        try{
            const res=await axios.post(`${USER_API_END_POINT}/register`,formData,
            {
                headers:{
                "Content-Type":"multipart/form-data"
                },
                withCredentials:true,
            })
            if(res.data.success) {
                navigate('/login')
                toast.success(res.data.message)
            }
        }
        catch(error)
        {
            console.log(error)
            // toast.error(error.response.data.message)
        }
    }
      useEffect(() => {
                    if(user)
                    {
                        navigate('/')
                    }
    
                }, [])

  return (
    <div>
        <Navbar />
        <form onSubmit={submitHandler} className='flex justify-center items-center mt-7' action="">
        <div className='flex flex-col gap-2  w-1/2 p-4 border-2 rounded'>
            <p className='text-black font-semibold text-2xl'>Sign Up</p>
            <div>
                <p>Full Name</p>
                <input className='w-full px-2 py-1 rounded-md border-2 outline-none' type="text" placeholder='Enter Name' value={input.fullname} name="fullname" onChange={changeEventHandler} />
            </div>
            <div>
                <p>Email</p>
                <input className='w-full px-2 py-1 rounded-md border-2 outline-none' type="email" placeholder='Enter Email' value={input.email} name="email" onChange={changeEventHandler} />
            </div>
            <div>
                <p>Phone Number</p>
                <input className='w-full px-2 py-1 rounded-md border-2 outline-none' type='text' placeholder='Enter Number' value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} />
            </div>
            <div>
                <p>Password</p>
                <input className='w-full px-2 py-1 rounded-md border-2 outline-none' type="password" placeholder='Enter Password' value={input.password} name="password" onChange={changeEventHandler} />
            </div>
            <div className='flex justify-between mt-3'>
                <div className='flex items-center gap-2'>
                    <input type='radio' name='role' value='Student' className='cursor-pointer' checked={input.role==='Student'} onChange={changeEventHandler}  />
                    <p>Student</p>
                    <input type='radio' name='role' value='Recruiter' className='cursor-pointer' checked={input.role==='Recruiter'} onChange={changeEventHandler}    />
                    <p>Recruiter</p>
                </div>
                <div className='flex items-center gap-2'>
                    <p>Profile</p>
                    <input type="file" accept='image/*' className='cursor-pointer' onChange={changeFileHandler} />
                </div>
            </div>
        <button type='submit' className='bg-black text-white font-semibold w-full rounded-md px-3 py-2 mt-5'>SignUp</button>
        <span className='text-gray-800 mt-2'>Already have an account ? <Link className='text-blue-500' to='/login'>Login</Link></span>
        </div>
        </form>
    </div>
  )
}

export default Signup