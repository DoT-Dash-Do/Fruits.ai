import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navig = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(email === "admin@gmail.com" && password==="admin123")
    {
        window.localStorage.setItem("LOGIN",true);
        console.log('Login successful!', { email, password });
        navig('/');
    }
    else
    {
        window.localStorage.setItem("LOGIN",false);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg mx-10 sm:mx-0">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login to fruits.ai</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className='text-gray-500'>
            email:admin@gmail.com
            pass:admin123
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
