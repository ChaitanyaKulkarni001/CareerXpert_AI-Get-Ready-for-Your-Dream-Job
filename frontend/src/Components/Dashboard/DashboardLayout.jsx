import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import your sidebar component
import { useState } from "react";
import { Menu } from "lucide-react"; // Import an icon for the toggle button

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-200 text-gray-800 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-full shadow-md"
        >
          <Menu size={24} />
        </button>
        
        {/* Content Area */}
        <div className="h-full overflow-auto p-8">
          <Outlet /> {/* Your main content renders here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;