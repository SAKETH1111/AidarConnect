// components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profession, setProfession] = useState('doctor');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Redirect to '/home' if logged in
    if (isLoggedIn) {
        navigate('/home');
    }
}, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:9000/users');
      if (response.ok) {
        const users = await response.json();
  
        // Check if the email and password match any user
        const user = users.find(
          (user) => user.email === email && user.password === password
        );
  
        if (user) {
          console.log('Login successful');
          localStorage.setItem('isLoggedIn',true);
          localStorage.setItem('fullName', user.fullName);
          localStorage.setItem('email', user.email);
          localStorage.setItem('profession', user.profession);
          console.log('user details',user); 
          navigate('/home'); // Navigate to the home page if credentials are correct
        } else {
          setError('Wrong email or password');
        }
      } else {
        setError('Failed to retrieve user data. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again later.');
    }
  };
  

  const handleSignUp = async (e) => {
    e.preventDefault();
    const signupData = {
      fullName,
      email,
      password,
      profession,
    };
  
    try {
      const response = await fetch('http://localhost:9000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
  
      if (response.ok) {
        // Display success message
        setSuccess('User signed up successfully');
        setError(''); // Clear any previous errors

        // Wait for 3 seconds, then reload the page
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error('Signup error:', errorData);
        setError(errorData.message || 'Failed to sign up. Please try again.');
        setSuccess(''); // Clear any success message
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred. Please try again later.');
      setSuccess(''); // Clear any success message
    }
  };
  
  return (
    <div className="flex items-center justify-center h-screen bg-pink-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-4xl font-bold text-rose-900 text-center mb-2">AIDAR</h1>
        <h2 className="text-xl text-rose-700 text-center mb-6">
          Welcome to Aidar Connect!
        </h2>

        {isSignUp ? (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm text-rose-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-rose-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-rose-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="profession" className="block text-sm text-rose-700">
                Profession
              </label>
              <select
                id="profession"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              >
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-rose-700 text-white py-2 rounded-lg hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              Sign Up
            </button>

            {success && <p className="text-green-500 text-center mt-4">{success}</p>}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            <p className="text-sm text-center text-rose-700 mt-4">
              Already have an account?{' '}
              <button
                type="button"
                className="text-rose-500 underline"
                onClick={() => setIsSignUp(false)}
              >
                Login
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-rose-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-rose-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-rose-700 text-white py-2 rounded-lg hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              Login
            </button>

            <p className="text-sm text-center text-rose-700 mt-4">
              Not a member?{' '}
              <button
                type="button"
                className="text-rose-500 underline"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </p>
          </form>
        )}

        <p className="text-xs text-center text-rose-500 mt-6">
          AidarConnect v2.0.0 | All Rights Reserved © Aidar Health
        </p>
      </div>
    </div>
  );
};

export default Login;
