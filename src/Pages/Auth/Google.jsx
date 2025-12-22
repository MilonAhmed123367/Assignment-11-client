import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';

const Google = () => {
    const { signInGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            // ১. ফায়ারবেস গুগল লগইন
            const result = await signInGoogle();
            const user = result.user;

            // ২. ব্যাকএন্ডের জন্য ডাটা গুছানো
            const userInfo = {
                name: user?.displayName,
                email: user?.email?.toLowerCase(), // ইমেইল সবসময় ছোট হাতের রাখা নিরাপদ
                photoURL: user?.photoURL,
                role: 'employee', // গুগল লগইনে ডিফল্ট রোল
                status: 'unaffiliated',
                dateCreated: new Date()
            };

            // ৩. ব্যাকএন্ডে পাঠানো (MongoDB-তে সেভ বা চেক করা)
            const res = await axios.post(
                'https://assignment-11-server-git-main-milon-ahmeds-projects.vercel.app/api/google-register',
                userInfo,
                { withCredentials: true } // এটি অবশ্যই যোগ করবেন
            );
            if (res.status === 200 || res.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                });

                // ৪. লগইন শেষে সঠিক পেজে পাঠানো
                const from = location.state?.from?.pathname || "/";
                navigate(from, { replace: true });
            }

        } catch (error) {
            console.error('Google Sign-In failed:', error);
            Swal.fire({
                icon: 'error',
                title: 'Sign-in Failed',
                text: error.message || 'Something went wrong!',
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <button
                onClick={handleGoogleSignIn}
                className="btn flex items-center justify-center gap-2 bg-white text-black border border-gray-300 w-full hover:bg-gray-50 hover:shadow-md transition-all duration-300 py-3 rounded-lg font-semibold"
            >
                <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <path fill="#fff" d="M0 0H512V512H0z"></path>
                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </svg>
                Continue with Google
            </button>
        </div>
    );
};

export default Google;