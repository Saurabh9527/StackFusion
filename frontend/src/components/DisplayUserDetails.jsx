
import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import UserDetails from './UserDetails';

const DisplayUserDetails = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <div className='p-6'>
      <h1 className="text-2xl font-bold mb-4 text-blue-800 text-center">User Details</h1>
      <UserDetails user ={user}/>
      </div>
    </div>
  )
}

export default DisplayUserDetails
