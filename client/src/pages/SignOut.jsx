import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../Components/OAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing icons

export default function SignUp() { // Corrected the function name
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!passwordPattern.test(formData.password)) {
      setError(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)'
      );
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);
      navigate('/sign-in'); // Redirect after successful sign-up
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />

        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />

        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            className='border p-3 rounded-lg w-full'
            id='password'
            onChange={handleChange}
          />
          <button
            type='button'
            className='absolute right-3 top-3'
            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Confirm Password'
            className='border p-3 rounded-lg w-full'
            id='confirmpassword'
            onChange={handleChange}
          />
          <button
            type='button'
            className='absolute right-3 top-3'
            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} // Toggle between eye and eye-slash
          </button>
        </div>

        <input
          type='text'
          placeholder='Address'
          className='border p-3 rounded-lg'
          id='address'
          onChange={handleChange}
        />

        <select id='lane' className='border p-3 rounded-lg' onChange={handleChange}>
          <option value=''>Select Lane</option>
          <option value='Lane A'>Lane A</option>
          <option value='Lane B'>Lane B</option>
          <option value='Lane C'>Lane C</option>
        </select>

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>

      {error && <p className='text-red-500 mt-2'>{error}</p>}

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span>Sign in</span>
        </Link>
      </div>
    </div>
  );
}
