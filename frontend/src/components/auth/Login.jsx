import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setLoading, setUser } from '../../redux/authSlice'
import { USER_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/navbar'


const Login = () => {
    
        const navigate=useNavigate()
        const dispatch = useDispatch()
        const {loading,user}=useSelector(store=>store.auth)

        const [input, setInput] = useState({
            email:"",
            password:"",
            role:"",
        })

        const changeEventHandler =(e)=>{
            setInput({...input, [e.target.name]: e.target.value })
        }
        const submitHandler=async(e)=>{
                e.preventDefault()
                // console.log(input)
                try{
                    dispatch(setLoading(true))
                    const res=await axios.post(`${USER_API_END_POINT}/login`,input,
                    {
                        headers:{
                        "Content-Type":"application/json"
                        },
                        withCredentials:true,
                    })
                    // console.log(res.data)
                    if(res.data.success) {
                        dispatch(setUser(res.data.user))
                        navigate('/')
                        toast.success(res.data.message)
                        
                    }
                }
                catch(error)
                {
                    console.log(error)
                    toast.error(error.response.data.message)
                }
                finally{
                    dispatch(setLoading(false))
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
            <p className='text-black font-semibold text-2xl'>Login</p>

            <div>
                <p>Email</p>
                <input className='w-full px-2 py-1 rounded-md border-2 outline-none' type="email" placeholder='Enter Email'  value={input.email} name="email" onChange={changeEventHandler}  />
            </div>
           
            <div>
                <p>Password</p>
                <input className='w-full px-2 py-1 rounded-md border-2 outline-none' type="password" placeholder='Enter Password' value={input.password} name="password" onChange={changeEventHandler}  />
            </div>
            <div className='flex justify-between mt-3'>
                <div className='flex items-center gap-2'>
                    <input type='radio' name='role' value='Student' className='cursor-pointer'  checked={input.role==='Student'} onChange={changeEventHandler}   />
                    <p>Student</p>
                    <input type='radio' name='role' value='Recruiter' className='cursor-pointer' checked={input.role==='Recruiter'} onChange={changeEventHandler}   />
                    <p>Recruiter</p>
                </div>
            </div>
            {/* {
                loading ? <Button> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</Button>
                :<button type='submit' className='bg-black text-white font-semibold w-full rounded-md px-3 py-2 mt-5'>Login</button> 
            } */}
        <button type='submit' className='bg-black text-white font-semibold w-full rounded-md px-3 py-2 mt-5'>Login</button>
        <span className='text-gray-800 mt-2'>Don't have an account ? <Link className='text-blue-500' to='/signup'>SignUp</Link></span>
        </div>
        </form>
    </div>
  )
}

export default Login