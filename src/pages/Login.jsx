import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [id, setId] = useState([])

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Role, setRole] = useState('')

  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
  event.preventDefault();
  try {
    let loginUrl = '';

    if (Role === 'Doctor') {
      loginUrl = 'http://localhost:3000/api/doctor/login-doctor';
    } else if (Role === 'Admin') {
      loginUrl = 'http://localhost:3000/api/user/login';
    } else {
      alert('Please select a valid role');
      return;
    }

    const { data } = await axios.post(loginUrl, { Email, Password,Role });

    if (data.success) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('id', data.data.id);
      localStorage.setItem('Email', data.data.Email);
      localStorage.setItem('Role', Role); 

      if (Role === 'Doctor') {
        navigate('/Dashboard');
      } else if (Role === 'Admin') {
        navigate('/Dashboard');
      }
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Something went wrong');
  }
};



  return (
    <form onSubmit={onSubmitHandler}>
      <div className='flex bg-slate-300 items-center justify-center h-screen'>
        <div className='bg-gray-400 rounded-md h-[370px] p-7 w-[420px]'>
          <h1 className='text-3xl font-bold mt-4'>
            Login
          </h1>
          <input
            className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
            type='Email'
            value={Email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
            type='Password'
            value={Password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
            value={Role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value='' disabled>Select Role</option>
            <option value='Admin'>Admin</option>
            <option value='Doctor'>Doctor</option>
          </select>

          <button className='bg-black rounded-md hover:cursor-pointer text-white h-10 w-full mt-4'>
            Login
          </button>
        </div>
      </div>
    </form>
  )
}

export default Login
