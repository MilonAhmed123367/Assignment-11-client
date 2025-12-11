import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import Google from "./Google";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedRole = watch("role");

  const handleRegistration = async (data) => {
    try {
      // Step 1: Firebase user creation
      await registerUser(data.email, data.password);

      // Step 2: Upload profile photo to ImgBB
      const imgFormData = new FormData();
      imgFormData.append("image", data.photo[0]);

      const imageUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      const imgRes = await axios.post(imageUploadURL, imgFormData);
      const photoURL = imgRes.data.data.url;

      // Step 3: Prepare user object
      let userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
        role: data.role,
        photoURL,
      };

      // Add HR fields if role is HR
      if (data.role === "hr") {
        userInfo = {
          ...userInfo,
          companyName: data.companyName,
          companyLogo: data.companyLogo,
          packageLimit: 5,
          currentEmployees: 0,
          subscription: "basic",
        };
      }

      // Step 4: Save user to backend (MongoDB)
      const saveRes = await axios.post(
        "http://localhost:5000/api/register",
        userInfo
      );
      console.log("User saved to DB:", saveRes.data);

      // Step 5: Update Firebase Profile
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      // Step 6: Redirect user
      navigate(location.state || "/");
    } catch (error) {
      console.error("Registration Failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-md shadow-xl p-6">
      <h3 className="text-3xl text-center font-bold">Create an Account</h3>
      <p className="text-center text-gray-500 mb-3">Register with ZapShift</p>

      {/* Avatar Placeholder */}
      <div className="flex justify-center mb-4">
        <div className="avatar">
          <div className="w-20 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-3xl">👤</span>
          </div>
        </div>
      </div>

      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset space-y-2">

          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered"
            placeholder="Full Name"
          />
          {errors.name && <p className="text-red-500">Name is required.</p>}

          {/* Date of Birth */}
          <label className="label">Date of Birth</label>
          <input
            type="date"
            {...register("dateOfBirth", { required: true })}
            className="input input-bordered"
          />
          {errors.dateOfBirth && (
            <p className="text-red-500">Date of birth is required.</p>
          )}

          {/* Photo Upload */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input file-input-bordered"
          />
          {errors.photo && <p className="text-red-500">Photo is required.</p>}

          {/* Role */}
          <label className="label">Register As</label>
          <select
            {...register("role", { required: true })}
            className="select select-bordered"
          >
            <option value="employee">Employee</option>
            <option value="hr">HR Manager</option>
          </select>

          {/* HR Only Fields */}
          {selectedRole === "hr" && (
            <>
              <label className="label">Company Name</label>
              <input
                type="text"
                {...register("companyName", { required: true })}
                className="input input-bordered"
                placeholder="Your Company Name"
              />
              {errors.companyName && (
                <p className="text-red-500">Company name is required.</p>
              )}

              <label className="label">Company Logo URL</label>
              <input
                type="text"
                {...register("companyLogo", { required: true })}
                className="input input-bordered"
                placeholder="Company Logo URL (ImgBB/Cloudinary)"
              />
              {errors.companyLogo && (
                <p className="text-red-500">Company logo URL required.</p>
              )}
            </>
          )}

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered"
            placeholder="Email Address"
          />
          {errors.email && <p className="text-red-500">Email is required.</p>}

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            className="input input-bordered"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Minimum 6 characters required</p>
          )}

          <button className="btn bg-lime-300 hover:bg-lime-400 mt-4 w-full">
            Register
          </button>
        </fieldset>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link
            state={location.state}
            to="/login"
            className="text-green-500 underline"
          >
            Login
          </Link>
        </p>
      </form>

      <div className="divider">Or</div>
      <Google></Google>
    </div>
  );
};

export default Register;
