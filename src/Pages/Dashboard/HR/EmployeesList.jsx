import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaUserGroup, FaIdCard, FaBoxArchive, FaEnvelope } from "react-icons/fa6";

const EmployeesList = () => {
  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axios.get("https://assignment-11-server-git-main-milon-ahmeds-projects.vercel.app/api/employees");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center min-h-[400px] gap-3">
      <span className="loading loading-ring loading-lg text-primary"></span>
      <p className="text-slate-400 font-bold animate-pulse">Syncing Employee Records...</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 max-w-6xl mx-auto"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <FaUserGroup className="text-primary" /> Employees <span className="text-primary">Registry</span>
          </h1>
          <p className="text-slate-500 font-medium">Manage and monitor all affiliated team members.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Staff</span>
            <span className="text-2xl font-black text-primary">{employees.length.toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Employee Grid */}
      {employees.length === 0 ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-20 text-center">
            <FaIdCard className="text-slate-200 text-5xl mx-auto mb-4" />
            <p className="text-slate-400 font-bold">No employees found in the system.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-100 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl font-black group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  {item?.name?.charAt(0) || "U"}
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Status</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[9px] font-black rounded-full uppercase">Active</span>
                </div>
              </div>

              <div className="space-y-1 mb-6">
                <h3 className="text-lg font-black text-slate-800 group-hover:text-primary transition-colors">{item?.name || "Anonymous User"}</h3>
                <div className="flex items-center gap-2 text-slate-400">
                    <FaEnvelope className="text-xs" />
                    <p className="text-xs font-medium truncate">{item?.email}</p>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                    <FaBoxArchive className="text-sm text-secondary" />
                    <span className="text-xs font-bold uppercase tracking-tighter">Assigned Assets</span>
                </div>
                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-700 group-hover:bg-secondary group-hover:text-white transition-all">
                    {item?.assetCount || 0}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default EmployeesList;