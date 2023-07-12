import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Perform login API request
      const response = await axios.post('http://localhost:9002/api/admin/login', { email, password });

      // Handle successful login
      console.log('Login successful', response.data.token);
      document.cookie = `token=${response.data.token}; path=/`; // Set the token as a cookie
      
      
      window.location.href = `http://localhost:3000/?token=${response.data.token}`;
      
    } catch (error) {
      // Handle login error
      console.error('Login failed', error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
