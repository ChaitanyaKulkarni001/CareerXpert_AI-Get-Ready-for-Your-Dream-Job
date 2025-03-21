import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, Repeat, Briefcase, Users, LogOut } from "lucide-react";
import { ACCESS_TOKEN } from "../../constants";
import { useState } from "react";

const Sidebar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { path: "/dashboard", title: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/dashboard/practice-interview", title: "Practice Interview", icon: <BookOpen size={20} /> },
    { path: "/dashboard/follow-up-interview", title: "Follow-Up Interview", icon: <Repeat size={20} /> },
    { path: "/dashboard/specific-role-interview", title: "Specific Role Interview", icon: <Briefcase size={20} /> },
    { path: "/dashboard/one-minute-question", title: "One-Minute Interview", icon: <span className="text-xl">⏱️</span> },
    { path: "/dashboard/situation-based-questions", title: "Quick Think", icon: <span className="text-xl">💡</span> },
    { path: "/dashboard/mock-interview", title: "Mock Interview", icon: <Users size={20} /> },
    { path: "/dashboard/talkmate", title: "Let's Connect & Speak ", icon:  <span className="text-xl">📞</span> },
    { path: "/dashboard/resume-check", title: "Analyze the Resume ", icon:  <span className="text-xl">🧠</span> },
  ];

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="w-68 bg-gray-200 text-gray-800 h-full p-5">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 rounded-md hover:bg-gray-300 ${isActive ? "bg-gray-300 " : ""}`
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}
        {/* Logout Button */}
        <li
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-300 rounded mt-4 text-red-600"
        >
          <LogOut size={20} /> Logout
        </li>
      </nav>
    </div>
  );
};

export default Sidebar;
