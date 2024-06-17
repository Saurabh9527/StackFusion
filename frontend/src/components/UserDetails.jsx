
import React from 'react'
import { PROFILE_AVTAAR } from '../utils/constant';

const UserDetails = ({user}) => {
  return (
<div className="flex flex-col justify-center items-center gap-4 p-4 border-2 border-sky-100 bg-white shadow-lg rounded-lg">
      <div className="flex-shrink-0 w-24 h-24">
        <img 
          src={PROFILE_AVTAAR} 
          alt="Profile" 
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="flex-grow">
        <div className="mb-4">
          <span className="block text-gray-600 font-medium">Name:</span>
          <span className="block text-lg font-semibold">{user.name}</span>
        </div>
        <div className="mb-4">
          <span className="block text-gray-600 font-medium">Email:</span>
          <span className="block text-lg font-semibold">{user.email}</span>
        </div>
        <div className="mb-4">
          <span className="block text-gray-600 font-medium">Mobile No:</span>
          <span className="block text-lg font-semibold">{user.contactNumber}</span>
        </div>
        <div>
          <span className="block text-gray-600 font-medium">Date Of Birth:</span>
          <span className="block text-lg font-semibold">{user.dob}</span>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
