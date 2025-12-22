import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserPen, FaCheck, FaXmark, FaEnvelope, FaIdCardClip } from "react-icons/fa6";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || user.name || "");
      setPhoto(user.photoURL || user.profileImage || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!name.trim() || !photo.trim()) {
        return Swal.fire("Wait!", "Name and Photo URL cannot be empty.", "warning");
    }

    setLoading(true);
    try {
      await axiosSecure.put(`/api/profile?email=${user?.email.toLowerCase()}`, {
        name: name,
        profileImage: photo,
      });

      if (updateUserProfile) {
        await updateUserProfile(name, photo);
      }

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your changes have been saved successfully!",
        confirmButtonColor: "#360185",
      });
      setIsEditing(false);
    } catch (error) {
      Swal.fire("Error", error.message || "Failed to update profile", "error");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-white rounded-[3rem] shadow-2xl shadow-primary/5 border border-slate-100 overflow-hidden"
      >
        {/* Profile Header Background */}
        <div className="h-32 bg-gradient-to-r from-primary to-secondary w-full relative">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                <div className="relative group">
                    <img 
                        src={photo || "https://i.postimg.cc/4yzY1qQq/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustrat.jpg"} 
                        className="w-32 h-32 rounded-full object-cover border-8 border-white shadow-xl transition-transform duration-500 group-hover:scale-105" 
                        alt="Profile" 
                    />
                    {isEditing && (
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-xs font-bold backdrop-blur-[2px]">
                            Editing...
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="pt-20 pb-10 px-8 md:px-12">
          {/* User Display Info */}
          <AnimatePresence mode="wait">
            {!isEditing ? (
              <motion.div 
                key="view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center space-y-6"
              >
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">{name}</h2>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/10">
                            {user?.role || "Member"}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                            <FaEnvelope />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Email Address</p>
                            <p className="text-sm font-bold text-slate-700">{user?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-secondary shadow-sm">
                            <FaIdCardClip />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Organization</p>
                            <p className="text-sm font-bold text-slate-700">{user?.companyName || "Personal Account"}</p>
                        </div>
                    </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-6 bg-primary text-white font-black py-4 rounded-2xl hover:bg-secondary transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95"
                >
                  <FaUserPen /> Edit Profile Details
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="edit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-5"
              >
                <div className="space-y-4">
                  <div className="relative">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute left-4 top-3">Full Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white pt-8 pb-3 px-4 rounded-2xl outline-none transition-all font-bold text-slate-700"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="relative">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute left-4 top-3">Profile Photo URL</label>
                    <input
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white pt-8 pb-3 px-4 rounded-2xl outline-none transition-all font-bold text-slate-700"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="flex-1 bg-primary text-white font-black py-4 rounded-2xl hover:bg-secondary transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
                  >
                    {loading ? <span className="loading loading-spinner loading-xs"></span> : <><FaCheck /> Save</>}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-slate-100 text-slate-600 font-black py-4 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <FaXmark /> Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;