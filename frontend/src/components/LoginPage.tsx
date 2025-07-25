import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx'; 
const LoginPage = () => {




    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here

        axios.post('http://localhost:6969/api/auth/login', {
            username,
            password
        })
        .then(response => {
            auth.login(response.data.user, response.data.token);
            console.log(response);
        })
        .catch(error => {
            console.error('Login error:', error);
        });
    }
    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen  bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        to enjoy your secure chat ✌️
                    </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <form className="space-y-6 " action="">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        required
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border  border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                                >
                                    Sign In
                                </button>
                            </div>
                            <div className="text-sm text-center">
                                <p  className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Don't have an account? Register
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        
        </>
    )
}

export default LoginPage;