import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Google = () => {
  const { signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      // Step 1: Firebase Google Sign-In
      const result = await signInGoogle();
      const user = result.user;
      console.log('Firebase user:', user);

      // Step 2: Prepare user info for backend
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: 'employee', // default role for Google login
      };

      // Step 3: Send to backend (MongoDB)
      const res = await axiosSecure.post('/api/register', userInfo);
      console.log('User saved to DB:', res.data);

      // Step 4: Redirect after login
      navigate(location.state || '/');
    } catch (error) {
      console.error('Google Sign-In failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-50">
      <div className="card w-full max-w-md shadow-xl p-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In with Google</h2>
        
        <button
          onClick={handleGoogleSignIn}
          className="btn flex items-center justify-center gap-2 bg-white text-black border border-gray-300 w-full"
        >
          <svg
            aria-label="Google logo"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="M0 0H512V512H0z" fill="#fff"></path>
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
            </g>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Google;
