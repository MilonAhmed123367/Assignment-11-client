import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import Google from './Google';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        setLoading(true);
        try {
            await signInUser(data.email.toLowerCase(), data.password);
            Swal.fire({
                icon: "success",
                title: "Welcome Back!",
                text: "Login successful.",
                timer: 1500,
                showConfirmButton: false,
                confirmButtonColor: "#360185"
            });
            navigate(location.state || "/dashboard");
        } catch (error) {
            console.error("Login Error:", error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Invalid email or password. Please try again.",
                confirmButtonColor: "#360185"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center p-4 bg-slate-50/50">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[450px] bg-white rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-slate-100 p-8 md:p-12"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <h3 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                        Welcome Back
                    </h3>
                    <p className="text-slate-400 font-medium mt-2">Enter your credentials to access AssetVerse</p>
                </div>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[2px] text-slate-400 ml-1 flex items-center gap-2">
                            <FaEnvelope className="text-primary" /> Email Address
                        </label>
                        <input 
                            type="email" 
                            {...register('email', { required: "Email is required" })} 
                            className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold text-slate-700 focus:bg-white ${errors.email ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-primary'}`} 
                            placeholder="name@company.com" 
                        />
                        {errors.email && <p className='text-red-500 text-[10px] font-bold ml-2'>{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[2px] text-slate-400 ml-1 flex items-center gap-2">
                            <FaLock className="text-primary" /> Password
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                {...register('password', { 
                                    required: "Password is required", 
                                    minLength: { value: 6, message: "Minimum 6 characters" } 
                                })} 
                                className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold text-slate-700 focus:bg-white ${errors.password ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-primary'}`} 
                                placeholder="••••••••" 
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && <p className='text-red-500 text-[10px] font-bold ml-2'>{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button 
                        disabled={loading}
                        className="w-full bg-primary text-white font-black py-5 rounded-[1.5rem] hover:bg-secondary transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center justify-center gap-3 text-lg disabled:opacity-70 mt-4"
                    >
                        {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-10">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Or continue with</span></div>
                </div>

                {/* Social Login */}
                <div className="mb-8">
                    <Google />
                </div>

                {/* Footer Link */}
                <p className="text-center text-slate-500 font-medium">
                    New to AssetVerse?{" "}
                    <Link
                        state={location.state}
                        className='text-primary font-black hover:underline underline-offset-4'
                        to="/register"
                    >
                        Create Account
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;