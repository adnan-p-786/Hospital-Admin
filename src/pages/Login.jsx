import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [state, setState] = useState('signUp')
  const [id, setId] = useState([])

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Role, setRole] = useState('')
  const [Name, setName] = useState('')

  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'signUp') {
        // Sign-up logic
        const { data } = await axios.post(
          'http://localhost:3000/api/user/create',
          { Name, Password, Email, Role }
        )
        console.log(data);

        if (data.success) {
          localStorage.setItem('Email', data.Email)
          setEmail(data.Email)
          // console.log(email);
          console.log("response", data);
          navigate('/')

        }


      } else {
        // Login logic
        const { data } = await axios.post(
          'http://localhost:3000/api/user/login',
          { Password, Email, Role }
        )
        console.log(data);
        if (data.success) {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('id', data.data.id);
          localStorage.setItem('Email', data.data.Email)
          localStorage.setItem('Role', data.data.Role)
          setEmail(data.Email)
          if (data.data.Role === 'Doctor') {
            navigate('/Dashboard');
          } else if (data.data.Role === 'Admin') {
            navigate('/Dashboard');
          }
        }

      }
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong')
    }
  }


  return (
    <form onSubmit={onSubmitHandler}>
      <div className='flex bg-slate-300 items-center justify-center h-screen'>
        <div className='bg-gray-400 rounded-md h-[420px] p-7 w-[420px]'>
          <h1 className='text-3xl font-bold mt-4'>
            {state === 'signUp' ? 'Create Account' : 'Login'}
          </h1>

          {state === 'signUp' && (
            <div className='w-full'>
              <input
                className='bg-slate-200 mt-4 rounded-md h-10 w-full px-3'
                type='text'
                placeholder='Full name'
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

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
            {state === 'signUp' ? 'Create Account' : 'Login'}
          </button>

          {state === 'signUp' ? (
            <p className='mt-5'>
              Already have an account?{' '}
              <span
                className='text-blue-600 underline cursor-pointer'
                onClick={() => setState('login')}
              >
                Login here
              </span>
            </p>
          ) : (
            <p className='mt-5'>
              Create Account?{' '}
              <span
                className='text-blue-600 cursor-pointer underline'
                onClick={() => setState('signUp')}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  )
}

export default Login
