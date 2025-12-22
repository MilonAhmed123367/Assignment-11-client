import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaUsers, FaEnvelope, FaIdBadge, FaCircleCheck } from "react-icons/fa6";

const MyTeam = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: team = [], isLoading, isError } = useQuery({
    queryKey: ["my-team", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/my-team?email=${user?.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center min-h-[500px] gap-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-slate-400 font-bold animate-pulse">Loading Team Directory...</p>
    </div>
  );

  if (isError) return (
    <div className="text-center py-20">
       <p className="text-red-500 font-bold bg-red-50 inline-block px-6 py-2 rounded-full border border-red-100">
         Error loading team members. Please try again.
       </p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-10 max-w-7xl mx-auto"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Team <span className="text-primary">Directory</span>
          </h1>
          <p className="text-slate-500 flex items-center gap-2 font-medium">
            <FaUsers className="text-secondary" /> 
            You are connected with {team.length} amazing colleagues
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center text-xl shadow-lg shadow-primary/20">
                <FaIdBadge />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</p>
                <p className="text-sm font-bold text-slate-700 italic">Official Member</p>
            </div>
        </div>
      </div>

      {/* Empty State */}
      {team.length === 0 ? (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-16 rounded-[3rem] text-center border-2 border-dashed border-slate-200"
        >
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 text-4xl">
             <FaUsers />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No Teammates Yet</h2>
          <p className="text-slate-500 max-w-sm mx-auto">
            It looks like you haven't been affiliated with a company yet. Contact your HR to get added.
          </p>
        </motion.div>
      ) : (
        /* Team Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {team.map((emp, idx) => (
            <motion.div
              key={emp._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 flex flex-col items-center relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:from-primary group-hover:to-secondary transition-colors duration-500"></div>

              {/* Profile Image */}
              <div className="relative mt-4">
                <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden relative z-10 transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={emp.profileImage || emp.photoURL || "https://i.postimg.cc/4yzY1qQq/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustrat.jpg"}
                    alt={emp.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {emp.role === 'hr' && (
                  <span className="absolute bottom-1 right-1 z-20 bg-secondary text-white text-[10px] font-black px-3 py-1 rounded-full border-2 border-white shadow-lg">
                    ADMIN
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="text-center mt-6 z-10 w-full">
                <h3 className="text-lg font-black text-slate-800 flex items-center justify-center gap-2 group-hover:text-primary transition-colors">
                  {emp.name || emp.displayName}
                  <FaCircleCheck className="text-blue-400 text-sm" />
                </h3>
                
                <div className="flex items-center justify-center gap-2 text-slate-400 mt-2 mb-6">
                   <FaEnvelope className="text-xs" />
                   <p className="text-xs font-medium truncate max-w-[180px]">{emp.email}</p>
                </div>

                {/* Role Badge */}
                <div className="bg-slate-50 rounded-2xl py-3 px-4 group-hover:bg-primary/5 transition-colors">
                   <span className="text-[10px] uppercase tracking-[3px] font-black text-slate-400 group-hover:text-primary transition-colors">
                     {emp.role === 'hr' ? 'HR Manager' : 'Employee'}
                   </span>
                </div>
              </div>

              {/* Decorative line */}
              <div className="w-12 h-1.5 bg-slate-100 rounded-full mt-6 group-hover:w-24 group-hover:bg-secondary transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyTeam;