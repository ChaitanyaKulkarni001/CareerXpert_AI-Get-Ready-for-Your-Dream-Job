import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import your sidebar component

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side Content */}
      <div className="flex-1 p-6">
        <Outlet /> {/* This will render the selected component */}
      </div>
    </div>
  );
};

export default DashboardLayout;
