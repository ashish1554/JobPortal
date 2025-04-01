// import axios from 'axios'
// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { toast } from 'react-toastify'
// import { setUser } from '../redux/authSlice'
// import { USER_API_END_POINT } from '../utils/constant'

// const UpdateProfileDialoag = ({open,setOpen}) => {

//     const {user}=useSelector(store=>store.auth)

//     const [input, setInput] = useState({
//         fullname:user?.fullname,
//         email:user?.email,
//         phoneNumber:user?.phoneNumber,
//         bio:user?.profile?.bio,
//         skills:user?.profile?.skills?.map(skill=>skill),
//         file:user?.profile?.resume
//     })
//     const dispatch=useDispatch()

//     const changeEventHandler =(e)=>{
//         setInput({...input, [e.target.name]: e.target.value })
//     }

//     const submitHandler =async (e)=>{
//         e.preventDefault()
//         const formData=new FormData()
//         formData.append('fullname', input.fullname)
//         formData.append('email', input.email)
//         formData.append('phoneNumber', input.phoneNumber)
//         formData.append('bio', input.bio)
//         formData.append('skills', input.skills)
//         if(input.file)
//         {
//             formData.append('file', input.file)
//         }
//         try{
//             const res= await axios.post(`${USER_API_END_POINT}/profile/update`,formData,
//                 {
//                     headers:{
//                         "Content-Type":"multipart/form-data"
//                     },
//                     withCredentials:true
//                 }
//             )
//             if(res.data.success) {
//                 console.log("hii")
//                 dispatch(setUser(res.data.user))
//                 toast.success(res.data.message)
//             }
//         }
//         catch(error){
//             console.log(error)
//         }
//         setOpen(false)
//         console.log(input)
//     }

//     const fileChangeHandler =(e)=>{
//         const file=e.target.files?.[0]
//         setInput({...input, file })
//     }
//   return (
//     <div>
//         <div>
//             <form onSubmit={submitHandler} action="">
//                 <div className='grid gap-4 py-4'>
//                     <div className='grid grid-cols-4 items-center gap-4'>
//                     <label htmlFor="name" className='text-right'>Name</label>
//                     <input 
//                     type="text" 
//                     id="name" 
//                     name="name"
//                     className='col-span-3'
//                     value={input.fullname}
//                     onChange={changeEventHandler}
//                     />
//                     </div>
//                     <div className='grid grid-cols-4 items-center gap-4'>
//                     <label htmlFor="email" className='text-right'>Email</label>
//                     <input 
//                     type="email" 
//                     id="email" 
//                     name="email"
//                     value={input.email}
//                     onChange={changeEventHandler}

//                     className='col-span-3'
//                     />
//                     </div>
//                     <div className='grid grid-cols-4 items-center gap-4'>
//                     <label htmlFor="number" className='text-right'>Number</label>
//                     <input 
//                     type="text" 
//                     id="number" 
//                     name="number"
//                     value={input.phoneNumber}
//                     onChange={changeEventHandler}

//                     className='col-span-3'
//                     />
//                     </div>
//                     <div className='grid grid-cols-4 items-center gap-4'>
//                     <label htmlFor="bio" className='text-right'>Bio</label>
//                     <input 
//                     type="text" 
//                     id="bio" 
//                     name="bio"
//                     value={input.bio}
//                     onChange={changeEventHandler}

//                     className='col-span-3'
//                     />
//                     </div>
//                     <div className='grid grid-cols-4 items-center gap-4'>
//                     <label htmlFor="skills" className='text-right'>Skills</label>
//                     <input 
//                     type="text" 
//                     id="skills" 
//                     name="skills"
//                     value={input.skills}
//                     onChange={changeEventHandler}
//                     className='col-span-3'
//                     />
//                     </div>
//                     <div className='grid grid-cols-4 items-center gap-4'>
//                     <label htmlFor="file" className='text-right'>Resume</label>
//                     <input 
//                     type="file" 
//                     id="file"
//                     name="file"
//                     accept='application/pdf'
//                     className='col-span-3'
//                     onChange={fileChangeHandler}
//                     />
//                     </div>
//                 </div>
//                 <button className='w-full my-4'>update</button>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default UpdateProfileDialoag

import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setUser } from '../redux/authSlice'
import { USER_API_END_POINT } from '../utils/constant'

const UpdateProfileDialoag = ({ open, setOpen }) => {
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "", // Convert array to string for input
        file: user?.profile?.resume || null
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false); // Close the modal on success
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile!");
        }
    };

    return (
        open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                    <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4'>
                            <input 
                                type="text" 
                                name="fullname"
                                placeholder="Full Name"
                                className="w-full p-2 border rounded"
                                value={input.fullname}
                                onChange={changeEventHandler}
                            />
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Email"
                                className="w-full p-2 border rounded"
                                value={input.email}
                                onChange={changeEventHandler}
                            />
                            <input 
                                type="text" 
                                name="phoneNumber"
                                placeholder="Phone Number"
                                className="w-full p-2 border rounded"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                            />
                            <textarea 
                                name="bio"
                                placeholder="Bio"
                                className="w-full p-2 border rounded"
                                value={input.bio}
                                onChange={changeEventHandler}
                            />
                            <input 
                                type="text" 
                                name="skills"
                                placeholder="Skills (comma-separated)"
                                className="w-full p-2 border rounded"
                                value={input.skills}
                                onChange={changeEventHandler}
                            />
                            <input 
                                type="file"
                                name="file"
                                accept="application/pdf"
                                className="w-full p-2 border rounded"
                                onChange={fileChangeHandler}
                            />
                        </div>
                        <div className="flex justify-between mt-4">
                            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setOpen(false)}>Cancel</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default UpdateProfileDialoag;
