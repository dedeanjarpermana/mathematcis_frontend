import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo_koperasi from "../image/logo_koperasi.png"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Mengirim login dengan:", { username, password }); // Debugging
    
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });
    
            console.log("Response dari backend:", response.data); // Debugging
    
            if (response.status >= 200 && response.status < 300) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.user?.username || "Guest");
                localStorage.setItem('id_anggota', response.data.user?.id_anggota || "N/A");
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert(error.response?.data?.message || 'Login gagal, coba lagi.');
        }
    };
    

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Section */}
            <div className="w-1/2 bg-blue-500 text-white flex flex-col justify-center items-center p-10">
                <img src={logo_koperasi} alt="Logo" className="w-60 h-60 mr-4" />
                <h1 className="text-4xl font-bold mb-4">Koperasi Maju Sejahtera Bersama</h1>
                <p className="text-lg text-center">
                    Koperasi MSB selalu menjunjung tinggi transparancy, akuntabilitas
                    serta menghadirkan harmony di dalam hidup.
                </p>
            </div>
            {/* Right Section */}
            <div className="w-1/2 flex justify-center items-center p-10">
                <form 
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" 
                    onSubmit={handleLogin}
                >
                    <h2 className="text-2xl font-bold mb-4">Sign in</h2>
                    <p className="text-gray-600 mb-6">
                        Welcome to <strong>Koperasi Maju Sejahtera Bersama</strong>
                    </p>
                    {/* Username Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    {/* Forgot Password */}
                    <div className="flex justify-end mb-4">
                        <a href="#" className="text-blue-500 text-sm hover:underline">Forgot Password?</a>
                    </div>
                    {/* Sign In Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
                    >
                        Sign In
                    </button>
                    {/* reCAPTCHA Notice */}
                    <p className="text-xs text-gray-500 mt-4 text-center">
                        Protected by reCAPTCHA and subject to Koperasi Maju Sejahtera Bersama&nbsp;
                        <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a> and&nbsp;
                        <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;