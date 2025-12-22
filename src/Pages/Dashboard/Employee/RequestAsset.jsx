import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaMagnifyingGlass, FaBoxesStacked, FaBuildingShield, FaCircleInfo } from "react-icons/fa6";

const RequestAsset = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: assets = [], isLoading, isError } = useQuery({
    queryKey: ["available-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/assets");
      const realData = Array.isArray(res.data) ? res.data : [];
      return realData.filter((a) => a.availableQuantity > 0);
    },
  });

  const requestMutation = useMutation({
    mutationFn: async (requestData) => {
      return axiosSecure.post("/api/requests", requestData);
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Request Submitted!",
        text: "Waiting for HR manager approval.",
        confirmButtonColor: "#360185",
      });
      queryClient.invalidateQueries(["available-assets"]);
    },
    onError: (err) => {
      Swal.fire("Error", err?.response?.data?.message || "Something went wrong", "error");
    },
  });

  const handleRequest = (asset) => {
    Swal.fire({
      title: `<span class="text-primary font-black">Request ${asset.productName}?</span>`,
      input: "textarea",
      inputLabel: "Note for HR Manager",
      inputPlaceholder: "Optional: Mention why you need this...",
      showCancelButton: true,
      confirmButtonText: "Submit Request",
      confirmButtonColor: "#360185",
      cancelButtonColor: "#8F0177",
      customClass: {
        popup: 'rounded-[2rem]',
        input: 'rounded-xl border-slate-200'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const requestData = {
          assetId: asset._id,
          assetName: asset.productName,
          assetType: asset.productType,
          assetImage: asset.productImage,
          hrEmail: asset.hrEmail?.toLowerCase(),
          companyName: asset.companyName,
          requesterName: user?.displayName || "Anonymous",
          requesterEmail: user?.email.toLowerCase(),
          note: result.value || "",
          requestDate: new Date(),
          requestStatus: "pending"
        };
        requestMutation.mutate(requestData);
      }
    });
  };

  // ফিল্টারিং লজিক
  const filteredAssets = assets.filter(asset => 
    asset.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center min-h-[500px] gap-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-slate-400 font-bold animate-pulse">Scanning Inventory...</p>
    </div>
  );

  if (isError) return (
    <div className="text-center py-20">
      <div className="bg-red-50 text-red-600 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-red-100 font-black">
        <FaCircleInfo /> Failed to sync with warehouse.
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-10 max-w-7xl mx-auto"
    >
      {/* Search & Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Request <span className="text-primary">New Assets</span>
          </h1>
          <p className="text-slate-500 font-medium">Browse and request available equipment from your company.</p>
        </div>

        <div className="relative group max-w-md w-full">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search by asset name..."
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Assets Grid */}
      {filteredAssets.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-slate-100">
           <FaBoxesStacked className="text-slate-200 text-6xl mx-auto mb-6" />
           <p className="text-slate-400 text-xl font-bold">No assets match your search or available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAssets.map((asset, idx) => (
            <motion.div
              key={asset._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-50 flex flex-col h-full"
            >
              {/* Product Image Area */}
              <div className="relative overflow-hidden rounded-[2rem] h-52 mb-6">
                <img 
                  src={asset.productImage || "https://via.placeholder.com/400x300?text=No+Image"} 
                  alt={asset.productName} 
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 right-4">
                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg ${
                     asset.productType === 'Returnable' 
                     ? 'bg-white/90 backdrop-blur-md text-primary' 
                     : 'bg-secondary text-white'
                   }`}>
                     {asset.productType}
                   </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-grow px-2">
                <h3 className="font-black text-xl text-slate-800 mb-3 group-hover:text-primary transition-colors line-clamp-1">
                  {asset.productName}
                </h3>
                
                <div className="space-y-2 mb-6">
                   <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <FaBuildingShield className="text-xs" />
                      <span className="font-bold truncate">{asset.companyName}</span>
                   </div>
                   <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl">
                      <span className="text-xs font-black text-slate-400 uppercase">Available Stock</span>
                      <span className={`text-sm font-black ${asset.availableQuantity < 5 ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {asset.availableQuantity.toString().padStart(2, '0')}
                      </span>
                   </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleRequest(asset)}
                disabled={requestMutation.isPending}
                className="w-full py-4 bg-primary text-white font-black rounded-2xl hover:bg-secondary disabled:bg-slate-200 disabled:text-slate-400 shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {requestMutation.isPending ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <>Request This Item</>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RequestAsset;