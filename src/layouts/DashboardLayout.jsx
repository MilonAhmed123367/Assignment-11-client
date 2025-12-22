import { NavLink, Outlet } from "react-router-dom";
import { FaBox, FaUsers, FaClipboardList, FaUser, FaGem, FaBars, FaArrowRightFromBracket } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import Logo from "../Component/Logo";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const DashboardLayout = () => {
  const { user, loading, logOut } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navStyles = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-bold ${
      isActive 
        ? "bg-white text-primary shadow-lg translate-x-2" 
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const isHR = user?.role === "hr";
  const isEmployee = user?.role === "employee";
  const isAffiliated = Array.isArray(user?.affiliations) && user.affiliations.length > 0;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC]">
      
      <div className="md:hidden flex items-center justify-between p-4 bg-primary text-white sticky top-0 z-50 shadow-md">
        <Logo color="white" />
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-2xl p-2">
          <FaBars />
        </button>
      </div>

      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-blue-300 to-[#9572cc] p-6 text-white transform transition-transform duration-300 ease-in-out shadow-2xl
        md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="hidden md:block mb-10">
           <Logo color="white" />
        </div>

        <nav className="flex flex-col h-[calc(100vh-180px)]">
          <div className="space-y-2 flex-grow overflow-y-auto custom-scrollbar pr-2">
            <p className="text-[10px] uppercase tracking-[2px] text-white/40 font-black mb-4 px-2">Main Menu</p>
            
            <NavLink to="/dashboard" end className={navStyles} onClick={() => setSidebarOpen(false)}>
              <MdDashboard className="text-xl" /> 
              <span>{isHR ? "Asset List" : "Dashboard Overview"}</span>
            </NavLink>

            {/* HR Only Routes */}
            {isHR && (
              <div className="pt-4 space-y-2">
                <p className="text-[10px] uppercase tracking-[2px] text-white/40 font-black mb-4 px-2">Management</p>
                <NavLink to="/dashboard/add-asset" className={navStyles} onClick={() => setSidebarOpen(false)}>
                  <FaBox /> <span>Add Asset</span>
                </NavLink>
                <NavLink to="/dashboard/requests" className={navStyles} onClick={() => setSidebarOpen(false)}>
                  <FaClipboardList /> <span>All Requests</span>
                </NavLink>
                <NavLink to="/dashboard/employees" className={navStyles} onClick={() => setSidebarOpen(false)}>
                  <FaUsers /> <span>My Employee List</span>
                </NavLink>
              </div>
            )}

            {/* Employee Only Routes */}
            {isEmployee && (
              <div className="pt-4 space-y-2">
                 <p className="text-[10px] uppercase tracking-[2px] text-white/40 font-black mb-4 px-2">Inventory</p>
                <NavLink to="/dashboard/request-asset" className={navStyles} onClick={() => setSidebarOpen(false)}>
                  <FaClipboardList /> <span>Request Asset</span>
                </NavLink>

                {isAffiliated ? (
                  <>
                    <NavLink to="/dashboard/my-assets" className={navStyles} onClick={() => setSidebarOpen(false)}>
                      <FaBox /> <span>My Assets</span>
                    </NavLink>
                    <NavLink to="/dashboard/my-team" className={navStyles} onClick={() => setSidebarOpen(false)}>
                      <FaUsers /> <span>My Team</span>
                    </NavLink>
                  </>
                ) : (
                  <div className="p-4 bg-white/5 rounded-2xl mt-4 border border-white/10 text-xs italic text-blue-100">
                    Team & Assets will unlock after approval.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer of Sidebar */}
          <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
            <NavLink to="/dashboard/profile" className={navStyles} onClick={() => setSidebarOpen(false)}>
              <FaUser /> <span>My Profile</span>
            </NavLink>
            <button 
              onClick={logOut} 
              className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all w-full text-red-300 hover:bg-red-500/10 font-bold"
            >
              <FaArrowRightFromBracket /> Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top bar for Profile & Quick Info */}
        <header className="hidden md:flex items-center justify-between px-10 py-5 bg-white border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-800">
            Welcome back, <span className="text-primary italic font-black">{user?.displayName?.split(' ')[0]}</span>
          </h2>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-sm font-black text-slate-900 leading-none">{user?.displayName}</p>
                <p className="text-[10px] text-primary uppercase font-bold tracking-widest">{user?.role}</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-primary overflow-hidden shadow-inner">
                <img src={user?.photoURL || "https://i.pravatar.cc/100"} alt="profile" className="object-cover w-full h-full" />
             </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
             <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;