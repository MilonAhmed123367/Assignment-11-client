import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import Google from "./Google";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaCalendarAlt, FaEnvelope, FaLock, FaBuilding, FaImage, FaUserTie } from "react-icons/fa";

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const selectedRole = watch("role");

  const handleRegistration = async (data) => {
    setLoading(true);
    try {
      // 1️⃣ Firebase-এ ইউজার তৈরি করা
      await registerUser(data.email, data.password);

      // 2️⃣ ইমেজ আপলোড করা (Direct File Upload to ImgBB)
      let photoURL = "";
      if (data.photo && data.photo.length > 0) {
        const imgFormData = new FormData();
        imgFormData.append("image", data.photo[0]);
        const imageUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        const imgRes = await axios.post(imageUploadURL, imgFormData);
        photoURL = imgRes.data.data.url;
      }

      const userInfo = {
        name: data.name,
        email: data.email.toLowerCase(),
        dateOfBirth: data.dateOfBirth,
        role: data.role,
        affiliations: [],
      };

      if (data.role === "hr") {
        userInfo.companyName = data.companyName;
        userInfo.companyLogo = photoURL; // লোগো হিসেবে আপলোড করা ইমেজটিই ব্যবহার করা হচ্ছে
        userInfo.profileImage = photoURL;
        userInfo.packageLimit = 5;
        userInfo.currentEmployees = 0;
        userInfo.subscription = "basic";
      }

      // 4️⃣ সরাসরি ব্যাকএন্ডে ডাটা পাঠানো
      await axios.post("https://assignment-11-server-git-main-milon-ahmeds-projects.vercel.app/api/register", userInfo);

      // 5️⃣ Firebase প্রোফাইল আপডেট
      await updateUserProfile(data.name, photoURL);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: `Welcome to AssetVerse, ${data.name}!`,
        confirmButtonColor: "#360185",
      });

      navigate(location.state || "/dashboard");
    } catch (error) {
      console.error("Registration Failed:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#360185",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50/50 py-12 shadow-2xl ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl shadow-primary/5 border border-slate-100 overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Side: Info */}
          <div className="lg:w-1/3 bg-primary p-10 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-black mb-4">Join AssetVerse</h2>
            <p className="text-primary-content/80 font-medium">
              Start managing your company assets with ease and efficiency.
            </p>
            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center italic font-serif">1</div>
                <p className="text-sm font-bold">Personal Details</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center italic font-serif">2</div>
                <p className="text-sm font-bold">Account Role</p>
              </div>
              <div className="flex items-center gap-4 opacity-50">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center italic font-serif">3</div>
                <p className="text-sm font-bold">Company Info</p>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:w-2/3 p-8 md:p-12 border border-primary">
            <form onSubmit={handleSubmit(handleRegistration)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                    <FaUser className="text-primary" /> Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700"
                  />
                  {errors.name && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.name.message}</p>}
                </div>

                {/* DOB */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" /> Date of Birth
                  </label>
                  <input
                    type="date"
                    {...register("dateOfBirth", { required: "Required" })}
                    className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700"
                  />
                </div>

                {/* Role Select */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                    <FaUserTie className="text-primary" /> Register As
                  </label>
                  <select
                    {...register("role", { required: "Required" })}
                    className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                  >
                    <option value="">Select Role</option>
                    <option value="employee">Employee</option>
                    <option value="hr">HR Manager</option>
                  </select>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                    <FaEnvelope className="text-primary" /> Email
                  </label>
                  <input
                    type="email"
                    placeholder="asset@example.com"
                    {...register("email", { required: "Email is required" })}
                    className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700"
                  />
                </div>
              </div>

              {/* Dynamic HR Fields */}
              <AnimatePresence>
                {selectedRole === "hr" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100"
                  >
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                        <FaBuilding className="text-primary" /> Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="AssetVerse Ltd."
                        {...register("companyName", { required: "Required for HR" })}
                        className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                        <FaImage className="text-primary" /> Company Logo / Profile
                      </label>
                      <input
                        type="file"
                        {...register("photo", { required: "Required for HR" })}
                        className="file-input file-input-bordered w-full rounded-2xl bg-slate-50 border-none h-[52px]"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                  <FaLock className="text-primary" /> Password
                </label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  {...register("password", {
                    required: "Password required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
                  className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700"
                />
              </div>

              <button
                disabled={loading}
                className="w-full bg-primary text-white font-black py-4 rounded-2xl hover:bg-secondary transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70 mt-4 active:scale-95"
              >
                {loading ? <span className="loading loading-spinner"></span> : "Create My Account"}
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
                <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-slate-400"><span className="bg-white px-4">Or sign up with</span></div>
              </div>

              <Google />

              <p className="text-center text-slate-500 font-medium pt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-black hover:underline underline-offset-4">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;