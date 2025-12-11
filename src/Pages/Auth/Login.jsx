import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import Google from './Google';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();


    const handleLogin = (data) => {
        console.log('form data', data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text font-bold">Welcome back</h3>
            <p className='text-center font-semibold'>Please Login</p>
            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">
                    {/* email field */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                    }

                    {/* password field */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters  or longer </p>
                    }


                    <button className="btn text-white text-sm mt-4 bg-gradient-to-r from-secondary to-primary hover:scale-103 transition-transform duration-300">Login</button>
                </fieldset>
                <p>New to AssetVerse? <Link
                    state={location.state}
                    className='text-blue-400 underline'
                    to="/register">Register</Link></p>
            </form>
            <Google></Google>
        </div>
    );
};

export default Login;