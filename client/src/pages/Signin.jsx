import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../Components/OAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Using FontAwesome icons

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false); // Track password visibility
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Fixing case to be lowercase

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));

      if (data.isAdmin) {
        navigate('/admin-dashboard'); 
      } else {
        navigate('/'); 
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        
        <div className="relative"> 
          <input
            type={showPassword ? 'text' : 'password'} // Toggle visibility
            placeholder="Password"
            className="border p-3 rounded-lg w-full" // Set full width for proper alignment
            id="password"
            onChange={handleChange}
          />
          <button
            type="button" 
            className="absolute right-3 top-3" // Positioning of the toggle icon
            onClick={() => setShowPassword(!showPassword)} // Toggle the visibility
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} 
          </button>
        </div>

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>

        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      
      {error && <p className="text-red-500 mt-5">{error.toString()}</p>}
    </div>
  );
};

export default SignIn;
