import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaPlus, FaListCheck, FaArrowRight, FaBoxOpen, FaUsers } from "react-icons/fa6";

const DashboardHome = () => {
  const { user } = useAuth();
  const isHR = user?.role === "hr";

  const data = [
    { name: 'Sun', assets: 400 },
    { name: 'Mon', assets: 300 },
    { name: 'Tue', assets: 500 },
    { name: 'Wed', assets: 280 },
    { name: 'Thu', assets: 590 },
    { name: 'Fri', assets: 320 },
    { name: 'Sat', assets: 450 },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      <div className="bg-gradient-to-r from-primary to-secondary rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="relative">
            <img 
              src={user?.photoURL || "https://i.pravatar.cc/150"} 
              alt="User" 
              className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white/20 shadow-2xl"
            />
            <div className="absolute bottom-2 right-2 bg-green-400 w-6 h-6 rounded-full border-4 border-[#360185]"></div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-black mb-3">
              Hello, {user?.displayName?.split(' ')[0] || "User"}! 👋
            </h1>
            <p className="text-white/80 text-lg max-w-xl leading-relaxed">
              {isHR 
                ? "Your organization's asset ecosystem is under your control. Track, approve, and manage with ease." 
                : "Welcome to your personal dashboard. Check your assigned items and pending requests below."}
            </p>
          </div>
        </div>
        
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
           <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl">
              <FaBoxOpen />
           </div>
           <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Assets</p>
              <h3 className="text-2xl font-black text-slate-900">***</h3>
           </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
           <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary text-2xl">
              <FaListCheck />
           </div>
           <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending Requests</p>
              <h3 className="text-2xl font-black text-slate-900">***</h3>
           </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
           <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 text-2xl">
              <FaUsers />
           </div>
           <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Team Status</p>
              <h3 className="text-2xl font-black text-slate-900">Active</h3>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6">Asset Usage Activity</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#360185" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#360185" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="assets" stroke="#360185" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* কুইক অ্যাকশন মেনু */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-center">
          <h3 className="text-xl font-black text-slate-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            {isHR ? (
              <>
                <Link to="/dashboard/add-asset" className="w-full flex items-center justify-between p-4 bg-primary text-white rounded-2xl font-bold hover:bg-secondary transition-all group">
                  Add New Asset <FaPlus className="group-hover:rotate-90 transition-transform" />
                </Link>
                <Link to="/dashboard/requests" className="w-full flex items-center justify-between p-4 bg-slate-50 text-slate-800 rounded-2xl font-bold hover:bg-slate-100 transition-all">
                  Review Requests <FaArrowRight />
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard/request-asset" className="w-full flex items-center justify-between p-4 bg-primary text-white rounded-2xl font-bold hover:bg-secondary transition-all">
                  Request Asset <FaPlus />
                </Link>
                <Link to="/dashboard/my-assets" className="w-full flex items-center justify-between p-4 bg-slate-50 text-slate-800 rounded-2xl font-bold hover:bg-slate-100 transition-all">
                  My Assets <FaArrowRight />
                </Link>
              </>
            )}
            <div className="pt-4 border-t border-slate-100 mt-4">
               <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest text-center">Organization: {user?.companyName || "N/A"}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;