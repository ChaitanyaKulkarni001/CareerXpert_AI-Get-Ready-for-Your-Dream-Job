import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../theme/plugins/swiper/swiper-bundle.css';
import '../../../theme/plugins/swiper/swiper-bundle.js';
import '../../../theme/styles/main.css'; // CSS import
import Form from './Form.jsx';
const Login = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/signUp');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="text-center">
          <h1 className="mb-3 text-3xl font-bold text-gray-800">Sign In</h1>
          <p className="text-md text-gray-600">Welcome back! Please sign in to continue.</p>
        </div>

        <div className="signin-options mt-6">
          <a
            className="border border-[#141647] text-[#141647] block w-full py-3 rounded-lg font-semibold hover:bg-[#141647] hover:text-white transition-all text-center"
            href="#"
          >
            Sign In With Google
          </a>
        </div>

        <div className="relative my-6 text-center">
          <span className="bg-white px-3 text-gray-500 relative z-10">Or Sign In With Email</span>
          <div className="absolute inset-0 border-t border-gray-300 top-1/2 transform -translate-y-1/2"></div>
        </div>

        {/* <form action="#">
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your Email Address"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your Password"
            />
          </div>

          <button
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-lg w-full transition-transform transform hover:scale-105"
            type="submit"
          >
            Sign In
          </button>
        </form> */}
        <Form/>

        <p className="mt-5 text-center text-gray-600">
          Can't <span className="text-blue-500 font-medium">log in</span>?{' '}
          <button className="text-blue-500 font-semibold hover:underline" onClick={handleNavigation}>
            Sign Up
          </button>{' '}
          to create an account.
        </p>
      </div>
    </section>
  );
};

export default Login;
