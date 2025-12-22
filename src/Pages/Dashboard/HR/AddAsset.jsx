import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaBoxOpen, FaLayerGroup, FaArrowUp91, FaImage } from "react-icons/fa6";

const AddAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    const assetInfo = {
      productName: data.productName,
      productType: data.productType,
      productQuantity: parseInt(data.productQuantity),
      availableQuantity: parseInt(data.productQuantity),
      productImage: data.productImage,
      hrEmail: user?.email.toLowerCase(),
      hrName: user?.displayName,
      companyName: user?.companyName,
      dateAdded: new Date(),
    };

    try {
      const res = await axiosSecure.post("/api/assets", assetInfo);
      if (res.data) {
        Swal.fire({
          icon: "success",
          title: "Inventory Updated",
          text: `${data.productName} has been added successfully!`,
          confirmButtonColor: "#360185",
        });
        reset();
        navigate("/dashboard");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add asset. Check your connection.", "error");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto my-10"
    >
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl mx-auto mb-4">
          <FaPlus />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Add New <span className="text-primary">Asset</span></h2>
        <p className="text-slate-500 mt-2 font-medium">Register new equipment into the company's digital inventory.</p>
      </div>

      {/* Form Card */}
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Product Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
              <FaBoxOpen className="text-primary" /> Product Name
            </label>
            <input
              type="text"
              placeholder="e.g. Dell UltraSharp 27 Monitor"
              {...register("productName", { required: "Product name is required" })}
              className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold text-slate-700 focus:bg-white ${errors.productName ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-primary'}`}
            />
            {errors.productName && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.productName.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Type */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                <FaLayerGroup className="text-primary" /> Asset Type
              </label>
              <select
                {...register("productType", { required: "Select a type" })}
                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer"
              >
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
            </div>

            {/* Product Quantity */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                <FaArrowUp91 className="text-primary" /> Stock Quantity
              </label>
              <input
                type="number"
                min="1"
                placeholder="10"
                {...register("productQuantity", { required: "Quantity is required" })}
                className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold text-slate-700 focus:bg-white ${errors.productQuantity ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-primary'}`}
              />
            </div>
          </div>

          {/* Product Image URL */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
              <FaImage className="text-primary" /> Product Image URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/asset-image.jpg"
              {...register("productImage", { required: "Image URL is required" })}
              className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold text-slate-700 focus:bg-white ${errors.productImage ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-primary'}`}
            />
          </div>

          {/* Additional Info / Info Box */}
          <div className="bg-primary/5 p-4 rounded-2xl flex gap-4 items-start border border-primary/10">
             <div className="w-8 h-8 rounded-full bg-white flex-shrink-0 flex items-center justify-center text-primary shadow-sm">
                <FaBoxOpen className="text-xs" />
             </div>
             <div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                   This asset will be listed under <span className="font-black text-primary">{user?.companyName || "your company"}</span>. Make sure the image URL is public.
                </p>
             </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white font-black py-5 rounded-[1.5rem] hover:bg-secondary transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center justify-center gap-3 text-lg disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <><FaPlus /> Confirm & Add Asset</>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddAsset;