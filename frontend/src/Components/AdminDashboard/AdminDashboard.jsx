import React, { useEffect, useState } from "react";
import api from "../../api";
import { FaEdit, FaStar, FaCommentAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null); // Loading state

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const res = await api.get("api/is_staff/");
        setIsAdmin(res.data.is_staff);
        if (!res.data.is_staff) {
          alert("You are not an admin. If this is a mistake, please contact the admin.");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching admin status:", error);
        alert("Failed to verify admin status.");
        navigate("/dashboard");
      }
    };

    fetchAdminStatus();
  }, [navigate]);

  if (isAdmin === null) {
    return <div className="text-center text-xl mt-10">Loading...</div>;
  }

  if (!isAdmin) return null;

  const handleQuiz = () => {
    navigate("quiz/");
  };
  const handleRating = () => {
    navigate("adminrating/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with subtle gradient and shadow */}
      <header className="w-full bg-gradient-to-r from-blue-700 to-blue-900 py-6 shadow-md">
        <h1 className="text-center text-3xl text-white font-bold tracking-wide">Admin Dashboard</h1>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* Card 1: Update Quiz */}
          <DashboardCard icon={<FaEdit />} title="Update Quiz" onClick={handleQuiz} />

          {/* Card 2: See Reviews */}
          <DashboardCard icon={<FaStar />} onClick={handleRating} title="See Reviews" />

          {/* Card 3: See Complaints */}
          <DashboardCard icon={<FaCommentAlt />} title="See Complaints" />

          {/* Card 4: Placeholder */}
          <DashboardCard title="Placeholder" />

          {/* Card 5: Placeholder */}
          <DashboardCard title="Placeholder" />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer p-6 flex flex-col items-center justify-center"
    >
      {icon && <div className="text-blue-600 text-5xl mb-4">{icon}</div>}
      <h3 className="text-xl font-medium text-gray-800">{title}</h3>
    </div>
  );
};

export default AdminDashboard;
