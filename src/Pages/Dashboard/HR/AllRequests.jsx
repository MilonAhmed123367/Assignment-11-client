import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaXmark, FaInbox, FaUser, FaBox, FaCalendarDay } from "react-icons/fa6";

const AllRequests = () => {
  const [status, setStatus] = useState("pending");
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data = [], isLoading } = useQuery({
    queryKey: ["requests", user?.email], // ফিল্টারিং ক্লায়েন্ট সাইডে করলে পারফরম্যান্স ভালো হয়
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/api/requests?email=${user?.email.toLowerCase()}`);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!user?.email,
  });

  // ক্লায়েন্ট সাইড ফিল্টারিং যাতে ট্যাব পরিবর্তনের সময় লোডিং না দেখায়
  const filteredRequests = data.filter((req) => req.requestStatus === status);

  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.post(`/api/requests/${id}/approve`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Request Approved!",
        text: "The asset has been successfully assigned.",
        confirmButtonColor: "#360185"
      });
      queryClient.invalidateQueries(["requests"]);
    },
    onError: (err) => {
      Swal.fire("Action Failed", err.response?.data?.message || "Something went wrong", "error");
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.post(`/api/requests/${id}/reject`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Rejected", "The request has been declined.", "info");
      queryClient.invalidateQueries(["requests"]);
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Confirm Approval?",
      text: "This will decrease available stock and assign the asset.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      confirmButtonColor: "#10b981", // Emerald 500
      cancelButtonColor: "#94a3b8",
      customClass: { popup: 'rounded-[2rem]' }
    }).then((result) => {
      if (result.isConfirmed) approveMutation.mutate(id);
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Request?",
      text: "Are you sure you want to decline this employee's request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject Now",
      confirmButtonColor: "#f43f5e", // Rose 500
      customClass: { popup: 'rounded-[2rem]' }
    }).then((result) => {
      if (result.isConfirmed) rejectMutation.mutate(id);
    });
  };

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center min-h-[500px] gap-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-slate-400 font-bold animate-pulse">Fetching Requests...</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-10 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Employee <span className="text-primary">Requests</span>
        </h1>
        <p className="text-slate-500 font-medium mt-1">Review and manage asset allocations for your team members.</p>
      </div>

      {/* Tabs / Filter Navigation */}
      <div className="flex flex-wrap gap-3 mb-8 bg-slate-100 p-1.5 rounded-[2rem] w-fit">
        {["pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setStatus(tab)}
            className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
              status === tab 
                ? "bg-white text-primary shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-2 px-6">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] tracking-[2px] border-none">
                <th className="bg-transparent py-6"><div className="flex items-center gap-2"><FaUser /> Employee</div></th>
                <th className="bg-transparent"><div className="flex items-center gap-2"><FaBox /> Asset Details</div></th>
                <th className="bg-transparent"><div className="flex items-center gap-2"><FaCalendarDay /> Requested On</div></th>
                <th className="bg-transparent text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredRequests.length === 0 ? (
                  <motion.tr 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="border-none"
                  >
                    <td colSpan="4" className="text-center py-24">
                      <div className="flex flex-col items-center gap-4">
                         <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 text-3xl">
                            <FaInbox />
                         </div>
                         <p className="text-slate-400 font-bold">No {status} requests found.</p>
                      </div>
                    </td>
                  </motion.tr>
                ) : (
                  filteredRequests.map((req, idx) => (
                    <motion.tr 
                      key={req._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="group"
                    >
                      {/* Employee Info */}
                      <td className="bg-slate-50/50 group-hover:bg-white rounded-l-3xl border-y border-l border-transparent group-hover:border-slate-100 transition-all">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm">
                             {req.requesterName?.charAt(0)}
                           </div>
                           <div>
                              <p className="font-black text-slate-800 leading-tight">{req.requesterName}</p>
                              <p className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">{req.requesterEmail}</p>
                           </div>
                        </div>
                      </td>

                      {/* Asset Info */}
                      <td className="bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 transition-all">
                        <p className="font-bold text-slate-700">{req.assetName}</p>
                        <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md ${
                          req.assetType === 'Returnable' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {req.assetType}
                        </span>
                      </td>

                      {/* Date Info */}
                      <td className="bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 transition-all text-slate-500 font-medium">
                        {new Date(req.requestDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>

                      {/* Action Buttons */}
                      <td className="bg-slate-50/50 group-hover:bg-white rounded-r-3xl border-y border-r border-transparent group-hover:border-slate-100 transition-all">
                        <div className="flex justify-center gap-3">
                          {req.requestStatus === "pending" ? (
                            <>
                              <button 
                                onClick={() => handleApprove(req._id)} 
                                className="h-10 w-10 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-90"
                                title="Approve"
                              >
                                <FaCheck />
                              </button>
                              <button 
                                onClick={() => handleReject(req._id)} 
                                className="h-10 w-10 flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-lg shadow-rose-200 transition-all active:scale-90"
                                title="Reject"
                              >
                                <FaXmark />
                              </button>
                            </>
                          ) : (
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              req.requestStatus === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                            }`}>
                              {req.requestStatus}
                            </span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AllRequests;