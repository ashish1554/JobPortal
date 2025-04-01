import React from 'react'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  const {allAppliedJobs}=useSelector(store=>store.job)
  return (
<div className="overflow-x-auto p- w-full">
  <table className="min-w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
    {/* Table Header */}
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="border-b border-gray-300 px-6 py-3 text-left">Date</th>
        <th className="border-b border-gray-300 px-6 py-3 text-left">Job Role</th>
        <th className="border-b border-gray-300 px-6 py-3 text-left">Company</th>
        <th className="border-b border-gray-300 px-6 py-3 text-left">Status</th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody>
      {
            allAppliedJobs.length<=0 ? <span>You have'nt applied any job yet</span> : allAppliedJobs.map((item) => (
            <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
              <td className="px-6 py-3">{item.createdAt.split('T')[0]}</td>
              <td className="px-6 py-3">{item.job?.title}</td>
              <td className="px-6 py-3">{item.job?.company.name}</td>
              <td className="px-6 py-3 text-green-600 font-semibold"><span className={`${item?.status==='rejected' ? 'text-red-500' : item.status==='pending' ? 'text-gray-500' : 'text-green-500'}`}>{item.status.toUpperCase()}</span></td>
            </tr>
      ))}
    </tbody>
  </table>
</div>


  )
}

export default AppliedJobTable