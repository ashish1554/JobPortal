// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { assets } from "../../assets/assets.js";
// const Navbar = () => {
  

//   const {user}=useSelector(store=>store.auth)
  
//   return (
//     <div className="flex items-center justify-between py-5 px-28">
//       <div className="">
//         <h1 className="text-gray-800 text-2xl font-semibold">
//           Job<span className="text-red-500">Portal</span>
//         </h1>
//       </div>
//       <div className="flex items-center">
//         <div>
//           <ul className="flex items-center gap-8 mx-10 text-gray-600">
//             <Link className="hover:text-primary" to='/'>Home</Link>
//             <Link className="hover:text-primary" to='/jobs'>Jobs</Link>
//             <Link className="hover:text-primary" to='/browse'>Browse</Link>
//           </ul>
//         </div>
//         {
//           !user ?
//           <div className=" flex gap-3">
//             <Link to='/login'><button className="bg-black text-white font-semibold rounded-md px-3 py-1">Login</button></Link>
//             <Link to='/signup'><button className="bg-red-500 text-white font-semibold rounded-md px-3 py-1">SignUp</button></Link>
//           </div>
//           :<div className="relative group">
//           {/* <!-- Profile Image --> */}
//           <img
//             className="rounded-full w-8 cursor-pointer"
//             src={assets.profile_pic}
//             alt="Profile"
//           />

//           {/* <!-- Dropdown Menu --> */}
//           <div className="absolute hidden group-hover:block bg-white rounded-lg shadow-lg mt-2 right-0 w-40">
//             <ul className="text-gray-700">
//               <button className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                <Link to='/profile'>View Profile</Link> 
//               </button>
//               <button className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                 <Link>Logout</Link>
//               </button>
//             </ul>
//           </div>
//         </div>
//         }
        
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets.js";
import { setUser } from "../../redux/authSlice.js";
import { USER_API_END_POINT } from "../../utils/constant.js";


const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const logoutHandler=async()=>{
    try{
      const res=await axios.post(`${USER_API_END_POINT}/logout`,{withCredentials:true})
      if(res.data.success)
      {
        dispatch(setUser(null))
        navigate("/")

        toast.success(res.data.message)
      }
    }
    catch(error){
      console.error(error)
      toast.error(error.message)
    }
  }
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-menu")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between py-5 px-28">
      {/* Logo */}
      <div>
        <h1 className="text-gray-800 text-2xl font-semibold">
          Job<span className="text-red-500">Portal</span>
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex items-center">
        <ul className="flex items-center gap-8 mx-10 text-gray-600">
          {
            user && user.role==='Recruiter' ? (
              <>
                  <Link className="hover:text-primary" to="/admin/companies">Companies</Link>
                  <Link className="hover:text-primary" to="/admin/jobs">Jobs</Link>
              </>
            ):
            <>
                  <Link className="hover:text-primary" to="/">Home</Link>
                  <Link className="hover:text-primary" to="/jobs">Jobs</Link>
                  <Link className="hover:text-primary" to="/browse">Browse</Link>
            </>
          }
    
        </ul>

        {/* Authentication */}
        {!user ? (
          <div className="flex gap-3">
            <Link to="/login">
              <button className="bg-black text-white font-semibold rounded-md px-3 py-1">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-red-500 text-white font-semibold rounded-md px-3 py-1">
                SignUp
              </button>
            </Link>
          </div>
        ) : (
          <div className="relative profile-menu">
            {/* Profile Image */}
            <img
              className="rounded-full w-8 cursor-pointer"
              src={assets.profile_pic}
              alt="Profile"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute bg-white rounded-lg shadow-lg mt-2 right-0 w-40">
                <ul className="text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link to="/profile">View Profile</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <button onClick={logoutHandler}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
