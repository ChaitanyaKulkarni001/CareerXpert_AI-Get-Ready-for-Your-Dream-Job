import React, { useEffect, useState } from "react";
import api from "../../api";
import { FaEdit, FaStar, FaCommentAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null); // Start as `null` to indicate loading state

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const res = await api.get("api/is_staff/");
        console.log("I am admin:", res.data.is_staff);
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
  }, [navigate]); // Dependency array includes `navigate`

  if (isAdmin === null) {
    return <div className="text-center text-xl mt-10">Loading...</div>;
  }

  if (!isAdmin) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 py-6">
        <h1 className="text-center text-2xl text-white font-bold">Admin Dashboard</h1>
      </header>

      {/* Dashboard Cards */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Card 1: Update Quiz */}
          <div className="bg-white rounded-lg shadow-lg flex flex-col items-center justify-center h-48 hover:shadow-xl transition-shadow cursor-pointer">
            <FaEdit className="text-blue-600 text-4xl mb-2" />
            <h3 className="text-lg font-medium">Update Quiz</h3>
          </div>
          {/* Card 2: See Reviews */}
          <div className="bg-white rounded-lg shadow-lg flex flex-col items-center justify-center h-48 hover:shadow-xl transition-shadow cursor-pointer">
            <FaStar className="text-blue-600 text-4xl mb-2" />
            <h3 className="text-lg font-medium">See Reviews</h3>
          </div>
          {/* Card 3: See Complaints */}
          <div className="bg-white rounded-lg shadow-lg flex flex-col items-center justify-center h-48 hover:shadow-xl transition-shadow cursor-pointer">
            <FaCommentAlt className="text-blue-600 text-4xl mb-2" />
            <h3 className="text-lg font-medium">See Complaints</h3>
          </div>
          {/* Card 4: Placeholder */}
          <div className="bg-white rounded-lg shadow-lg flex flex-col items-center justify-center h-48 hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="text-lg font-medium">Placeholder</h3>
          </div>
          {/* Card 5: Placeholder */}
          <div className="bg-white rounded-lg shadow-lg flex flex-col items-center justify-center h-48 hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="text-lg font-medium">Placeholder</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
