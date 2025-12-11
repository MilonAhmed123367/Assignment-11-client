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

  const selectedRole = watch("role"); // Watch role

  const handleRegistration = async (data) => {
    try {
      // Firebase user creation
      await registerUser(data.email, data.password);

      // ImgBB upload only if HR uploads photo
      let photoURL = "";
      if (data.role === "hr" && data.photo && data.photo.length > 0) {
        const imgFormData = new FormData();
        imgFormData.append("image", data.photo[0]);
        const imageUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        const imgRes = await axios.post(imageUploadURL, imgFormData);
        photoURL = imgRes.data.data.url;
      }

      // Prepare user object
      let userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
        role: data.role,
        ...(selectedRole === "hr" ? { photoURL } : {}),
      };

      // Add HR extra fields
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

      await axios.post("http://localhost:5000/api/register", userInfo);

      // Update Firebase profile with name/photo
      await updateUserProfile({ displayName: data.name, photoURL });

      navigate(location.state || "/");
    } catch (error) {
      console.error("Registration Failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full mx-auto max-w-3xl p-6">
      <h3 className="text-4xl text-center bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text font-bold">Create an Account</h3>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
        onSubmit={handleSubmit(handleRegistration)}
      >

        {/* ----- NAME ----- */}
        <div className="col-span-1">
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* ----- DATE OF BIRTH ----- */}
        <div className="col-span-1">
          <label className="label">Date of Birth</label>
          <input
            type="date"
            {...register("dateOfBirth", { required: "Date of birth is required" })}
            className="input input-bordered w-full"
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
          )}
        </div>

        {/* ----- PHOTO for HR ONLY ----- */}
        {selectedRole === "hr" && (
          <div className="col-span-2">
            <label className="label">Photo</label>
            <input
              type="file"
              {...register("photo", {
                required: "Photo is required for HR",
              })}
              className="file-input file-input-bordered w-full"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo.message}</p>
            )}
          </div>
        )}

        {/* ----- ROLE ----- */}
        <div className="col-span-1">
          <label className="label">Register As</label>
          <select
            {...register("role", { required: "Role is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select Role</option>
            <option value="employee">Employee</option>
            <option value="hr">HR Manager</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* ----- COMPANY NAME (HR) ----- */}
        {selectedRole === "hr" && (
          <div className="col-span-1">
            <label className="label">Company Name</label>
            <input
              type="text"
              {...register("companyName", { required: "Company name is required" })}
              className="input input-bordered w-full"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm">{errors.companyName.message}</p>
            )}
          </div>
        )}

        {/* ----- COMPANY LOGO (HR) ----- */}
        {selectedRole === "hr" && (
          <div className="col-span-1">
            <label className="label">Company Logo URL</label>
            <input
              type="text"
              {...register("companyLogo", { required: "Company logo URL is required" })}
              className="input input-bordered w-full"
            />
            {errors.companyLogo && (
              <p className="text-red-500 text-sm">{errors.companyLogo.message}</p>
            )}
          </div>
        )}

        {/* ----- EMAIL ----- */}
        <div className="col-span-1">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* ----- PASSWORD ----- */}
        <div className="col-span-1">
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="input input-bordered w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* ----- SUBMIT BUTTON ----- */}
        <button className="btn btn-primary col-span-2 mt-4 bg-gradient-to-r from-secondary to-primary hover:scale-103 transition-transform duration-300">
          Register
        </button>
      </form>

      {/* ----- LOGIN LINK ----- */}
      <p className="text-center mt-3">
        Already have an account?{" "}
        <Link state={location.state} to="/login" className="text-blue-500 underline">
          Login
        </Link>
      </p>

      <div className="divider">Or</div>
      <Google />
    </div>
  );
};

export default Register;
