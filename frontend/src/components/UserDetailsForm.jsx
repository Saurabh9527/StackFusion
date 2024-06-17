
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_END_POINT, calculateAge } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContext';

const UserDetailsForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        email: '',
        contactNumber: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const { dateOfBirth, contactNumber } = formData;
        const age = calculateAge(dateOfBirth);

        if (dateOfBirth && age < 18) {
            setErrorMessage('Age must be at least 18 years');
        } else if (contactNumber && contactNumber.length !== 10) {
            setErrorMessage('phone number must be 10 digit');
        } else {
            setErrorMessage('');
        }
    }, [formData.dateOfBirth, formData.contactNumber]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { name, dateOfBirth, email, contactNumber } = formData;
        const age = calculateAge(dateOfBirth);

        if (age < 18) {
            setIsLoading(false);
            return;
        }

        if (contactNumber.length !== 10 || contactNumber.startsWith('0')) {
            setIsLoading(false);
            return;
        }

        try {
            const res = await axios.post(`${API_END_POINT}/user-form`, { name, dateOfBirth, email, contactNumber },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

            if (res.data.success) {
                toast.success(res.data.message)
                setUser(res.data.user);
                navigate("/userdetails");
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            if (error.response) {
                toast.error(`Error: ${error.response.data.message}`);
            } else if (error.request) {
                toast.error('Network Error');
            } else {
                toast.error(`Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='pr-2 pl-2'>
            <form onSubmit={handleSubmit}
                className='w-full max-w-md mx-auto border-2 border-gray-400 mt-14 rounded-lg shadow-xl'>
                <div className='p-4'>
                    <div className='flex flex-col w-full'>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='border border-slate-500 w-full px-2 py-2 mb-2 rounded-lg outline-none'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>Date of Birth:</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                            className='border border-slate-500 w-full px-2 py-2  mb-2 rounded-lg outline-none'

                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='border border-slate-500 w-full px-2 py-2 mb-2 rounded-lg outline-none'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>Phone Number:</label>
                        <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            required
                            className='border border-slate-500 w-full px-2 py-2 mb-2 rounded-lg outline-none'
                        />
                    </div>
                    {errorMessage && <p className='text-red-500 font-medium mb-2'>{errorMessage}</p>}
                    <button
                        type="submit"
                        className={`font-semibold border border-gray-500 bg-sky-500 w-full px-2 py-2 mb-2 shadow-md rounded-lg hover:bg-sky-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserDetailsForm
