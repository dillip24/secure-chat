import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx'; 

async function generateKeyPair() {
  try {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048, // Key size in bits
        publicExponent: new Uint8Array([1, 0, 1]), // Standard public exponent (65537)
        hash: 'SHA-256', // Hashing algorithm
      },
      true, // The key is extractable, so we can store it
      ['encrypt', 'decrypt'] // Key usages
    );
    return keyPair;
  } catch (error) {
    console.error('Key generation failed:', error);
    return null;
  }
}

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [ confirmPassword, setConfirmPassword] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword || password.length < 8) {
            console.error('Passwords do not match or are too short');
            return;
        }
        const keyPair = await generateKeyPair();
        if (!keyPair) {
            console.error('Key pair generation failed');
            return;
        }
        const publicKey = keyPair.publicKey;
        const privateKey = keyPair.privateKey;

        axios.post('http://localhost:6969/api/auth/register', {
            username,
            email,
            password,
            publicKey: publicKey,
            confirmPassword
        })
        .then((response: { data: any; }) => {
            console.log('Registration successful:', response.data);
            // Optionally, you can redirect the user or show a success message
        })
        .catch((error: any) => {
            console.error('Registration error:', error);
        });
        console.log("hello");
    }
        

    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen  bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create an account
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
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
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
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <div className="mt-1">
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                                    Register
                                </button>
                            </div>
                            <div className="text-sm text-center">
                                <p  className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Already have an account? Login
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        
        </>
    )
}

export default RegisterPage;