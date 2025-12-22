import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaFilePdf, FaXmark, FaBoxOpen, FaClockRotateLeft } from "react-icons/fa6";

const MyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["my-assets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/my-assets?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/api/requests/${id}`);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Cancelled!",
        text: "Your request has been removed.",
        icon: "success",
        confirmButtonColor: "#360185", // Primary color
      });
      queryClient.invalidateQueries(["my-assets"]);
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-10 max-w-7xl mx-auto"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            My Requested <span className="text-primary">Assets</span>
          </h1>
          <p className="text-slate-500 mt-2 flex items-center gap-2">
            <FaClockRotateLeft className="text-secondary" /> 
            Track and manage your asset history
          </p>
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-4 py-2 rounded-full">
          Dashboard / My Assets
        </div>
      </div>

      {/* Stats Summary (Mini) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase">Total</p>
            <p className="text-xl font-bold text-slate-800">{assets.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-orange-400 uppercase">Pending</p>
            <p className="text-xl font-bold text-slate-800">
                {assets.filter(a => a.requestStatus === "pending").length}
            </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-2 px-4">
            <thead>
              <tr className="text-slate-400 uppercase text-[11px] tracking-widest border-none">
                <th className="bg-transparent py-6">Asset Details</th>
                <th className="bg-transparent hidden md:table-cell">Type</th>
                <th className="bg-transparent">Request Date</th>
                <th className="bg-transparent">Status</th>
                <th className="bg-transparent text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="space-y-4">
              {assets.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-24">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 text-4xl">
                        <FaBoxOpen />
                      </div>
                      <p className="text-slate-400 font-medium">No assets requested yet.</p>
                      <button className="btn btn-primary btn-sm rounded-full px-6">Browse Assets</button>
                    </div>
                  </td>
                </tr>
              ) : (
                assets.map((asset) => (
                  <tr key={asset._id} className="group transition-all">
                    <td className="bg-slate-50/50 group-hover:bg-white rounded-l-2xl border-y border-l border-transparent group-hover:border-slate-100 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-bold">
                          {asset.assetName.charAt(0)}
                        </div>
                        <div>
                           <div className="font-black text-slate-700">{asset.assetName}</div>
                           <div className="text-[10px] md:hidden text-primary font-bold">{asset.assetType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 hidden md:table-cell transition-all">
                      <span className="px-3 py-1 rounded-lg bg-white border border-slate-100 text-xs font-bold text-slate-500 uppercase">
                        {asset.assetType}
                      </span>
                    </td>
                    <td className="bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 text-slate-500 font-medium transition-all">
                      {new Date(asset.requestDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 transition-all">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          asset.requestStatus === "pending"
                            ? "bg-amber-100 text-amber-600"
                            : asset.requestStatus === "approved"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-rose-100 text-rose-600"
                        }`}
                      >
                        {asset.requestStatus}
                      </span>
                    </td>
                    <td className="bg-slate-50/50 group-hover:bg-white rounded-r-2xl border-y border-r border-transparent group-hover:border-slate-100 text-right transition-all">
                      <div className="flex justify-end gap-3">
                        {asset.requestStatus === "pending" && (
                          <button
                            onClick={() => cancelMutation.mutate(asset._id)}
                            className="btn btn-sm btn-ghost text-rose-500 hover:bg-rose-50 rounded-xl flex items-center gap-2"
                          >
                            <FaXmark /> Cancel
                          </button>
                        )}
                        {asset.requestStatus === "approved" && (
                          <button className="btn btn-sm bg-primary hover:bg-secondary text-white border-none rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 transition-all active:scale-95">
                            <FaFilePdf /> <span className="hidden sm:inline">Download PDF</span>
                          </button>
                        )}
                        {asset.requestStatus === "rejected" && (
                          <span className="text-[10px] font-black text-slate-300 uppercase italic pr-4">Closed</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default MyAssets;