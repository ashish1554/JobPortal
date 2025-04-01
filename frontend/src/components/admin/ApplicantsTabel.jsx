import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { APPLICATION_API_END_POINT } from "../../utils/constant";

const shortListingStatus = ["Accepted", "Rejected"];
const ApplicantsTabel = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler=async(status,id)=>{
    try{
      const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},
        {
          withCredentials: true,
        }
      )
      if(res.data.success)
      {
        toast.success(res.data.message);
  
      }
    }
    catch(err){
      toast.error(err.message);
      console.log(err);
    }
  }
  // console.log(applicants);

  return (
    <div className="w-full">
      <div className=" w-full bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 px-4 py-2">Full Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Contact</th>
              <th className="border border-gray-300 px-4 py-2">Resume</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants &&
              applicants?.applications?.map((item) => {
                return (
                  <tr className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {item.applicant.fullname}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.applicant.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.applicant.phoneNumber}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {
                        item?.applicant?.profile?.resume ?<a
                        href={item.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Download Resume
                      </a>: <span>NA</span>
                      }
                    
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.applicant.createdAt.split("T")[0]}
                    </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <Popover className="relative">
                            <PopoverButton className="p-2  text-gray-600 hover:bg-gray-200 rounded-full">
                            <MoreHorizontal size={20} />
                            </PopoverButton>
                            <PopoverPanel className="absolute  right-0 mt-2 w-32 bg-white border shadow-md rounded-md p-2 z-10">
                            {shortListingStatus.map((status, index) => {
                                return (
                                <div onClick={()=>statusHandler(status,item._id)}>
                                    <span>{status}</span>
                                </div>
                                );
                            })}
                            </PopoverPanel>
                        </Popover>
                        </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantsTabel;
