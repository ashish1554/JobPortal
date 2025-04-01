import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JOB_API_END_POINT } from "../../utils/constant";
import Navbar from "../shared/Navbar";

const companyArray=[];
const PostJobs = () => {

  const navigate=useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const {companies}=useSelector(store=>store.company)

  const changeEventHandler = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler=async (e)=>{
    setInput({ ...input, companyId: e.target.value });
    // const selectedCompany=companies.find((company)=>company.name.toLowerCase()==value);
    // setInput({...input, companyId: selectedCompany._id });
  }

  const submitHandler=async(e)=>{
    e.preventDefault();
    // console.log(input)
    // console.log(companies)

    try{
      const res=await axios.post(`${JOB_API_END_POINT}/post`,input,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true,
      })
      if(res.data.success)
      {
        toast.success(res.data.message);
        navigate("/admin/jobs")
      }
    }
    catch(error){
      toast.error(error.response.data.message)
      console.log(error)
    }
  }
  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} action="" className="p-8 max-w-4xl border-gray-200 shadow-lg rounded-md">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="">Description</label>
            <input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="">Requirements</label>
            <input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="">Salary</label>
            <input
              type="text"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="">Location</label>
            <input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor=""> JobType</label>
            <input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="">Experience</label>
            <input
              type="text"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="">NO of Position</label>
            <input
              type="number"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md"
            />
          </div>
          {
              companies.length>=0 &&
              (
                <select onChange={selectChangeHandler} name="companyId" id="companyId"   className="focus-visible:ring-offset-0 focus-visible:right-0 my-1 border-2 w-full px-4 py-2 rounded-md">
                   <option value="" disabled selected hidden>Select Company</option>
                   {
                    companies.map((company)=>{
                       return (
                         <option value={company._id} key={company._id}>{company.name}</option>
                       )
                    })
                   }
                </select>
              )
          }
        </div>
        <button className="w-full bg-black text-white font-md px-3 py-2 mt-4 rounded-full text-xl">Post New Job</button>
        {
          companies.length === 0 && <p className="text-sm text-red-600 font-bold text-center my-3">*Please register company first,before posting a jobs</p>
        }
        </form>
      </div>
    </div>
  );
};

export default PostJobs;
