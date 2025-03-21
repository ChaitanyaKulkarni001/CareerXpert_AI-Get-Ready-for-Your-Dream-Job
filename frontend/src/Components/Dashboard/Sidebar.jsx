import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, Repeat, Briefcase, Users, LogOut } from "lucide-react";
import { ACCESS_TOKEN } from "../../constants";
import { useContext, useState } from "react";
import { ThemeContext } from "../ThemeContext";

const Sidebar = () => {
  const {theme} = useContext(ThemeContext);
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
    { path: "/dashboard/talkmate", title: "Let's Connect & Speak ", icon: <span className="text-xl">📞</span> },

    { path: "/dashboard/debate", title: "Debate", icon: <span className="text-xl">🐏</span> },

    { path: "/dashboard/quiz", title: "Take a Quiz ", icon: <span className="text-xl">🕸️</span> },
    { path: "/dashboard/coding-quiz", title: "Code Quiz ", icon: <span className="text-xl">🕸️</span> },
    { path: "/dashboard/resume-check", title: "Analyze the Resume ", icon: <span className="text-xl">🧠</span> },
    { path: "/dashboard/group-discussion", title: "Group Discussion ", icon: <span className="text-xl">🧠</span> },

    { path: "/dashboard/history", title: "History ", icon: <span className="text-xl">👴🏻</span> },

  ];

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (

    <div
    className={`w-72 h-screen p-6 shadow-lg rounded-r-lg flex flex-col transition-all duration-300 ${
      theme === "dim" ? "bg-white text-black" : "bg-gray-900 text-white"
    }`}
  >
    {/* Dashboard Title */}
    <h2
      className={`text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text`}
    >
      Dashboard
    </h2>
  
    {/* Navigation Menu */}
    <nav className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-900">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg text-lg font-medium transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-blue-600 to-purple-500 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                : "hover:shadow-[0_0_12px_rgba(0,255,255,0.5)] hover:border-cyan-400"
            } ${
              theme === "dim"
                ? "text-gray-800 hover:bg-gray-300"
                : "text-white hover:bg-gray-800"
            }`
          }
        >
          {item.icon}
          <span>{item.title}</span>
        </NavLink>
      ))}
    </nav>
  
    {/* Logout Button */}
    <div
      onClick={handleLogout}
      className={`flex items-center gap-3 p-3 mt-4 cursor-pointer font-semibold rounded-lg transition-all duration-300 ${
        theme === "dim"
          ? "text-red-500 hover:bg-red-300 hover:text-black"
          : "text-red-500 hover:bg-red-700 hover:text-white"
      } hover:shadow-[0_0_12px_rgba(255,0,0,0.7)]`}
    >
      <LogOut size={20} />
      Logout

    </div>
  </div>
  
  );
};

export default Sidebar;
