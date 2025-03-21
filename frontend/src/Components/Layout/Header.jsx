import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../src/assets/logo.png';
import { ACCESS_TOKEN } from '../../constants';
import userProfilepic from '../../assets/profile.png';
import { LogOut, User } from "lucide-react"; // Icons
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // Store user profile pic
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem(ACCESS_TOKEN);
    setIsAuthenticated(!!token);

    if (token) {
      // Fetch user profile details (Replace this with actual API call)
      const user = JSON.parse(localStorage.getItem("user")) || {}; // Example
      setUserProfile(userProfilepic); // Default avatar
    }
  }, []);

  const handleNavigation = () => {
    navigate('/login');
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const goToDashboard = () => {
    navigate("/dashboard");
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };
  return (
    <header className="fixed top-0 left-0 h-20 w-full bg-[#011638] shadow-md z-50">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a href="/" className="flex items-center">
            <img src={logo} width="50" alt="logo" className="transition-transform duration-300 hover:scale-105" />
          </a>
          <span className="text-white text-xl font-semibold">AI Interview</span>
        </div>

        {/* Navbar menu */}
        <ul className="hidden lg:flex space-x-6 font-play">
          <li>
            <a href="/" className="nav-link text-lg text-white hover:text-gray-200 transition-colors duration-300 !important">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="nav-link text-lg text-white hover:text-gray-200 transition-colors duration-300 !important">
              About
            </a>
          </li>
          {/* <li>
            <a href="/blog" className="nav-link text-lg text-white hover:text-gray-200 transition-colors duration-300 !important">
              Blog
            </a>
          </li> */}
          <li>
            <a href="/features" className="nav-link text-lg text-white hover:text-gray-200 transition-colors duration-300 !important">
              Features
            </a>
          </li>
          {/* <li>
            <a href="/how-it-works" className="nav-link text-lg text-white hover:text-gray-200 transition-colors duration-300 !important">
              How It Works
            </a>
          </li> */}
          <li>
            <a href="/contact" className="nav-link text-lg text-white hover:text-gray-200 transition-colors duration-300 !important">
              Contact
            </a>
          </li>
        </ul>

        {/* Sign In Button */}
        <div className="order-1 ml-auto hidden items-center md:order-2 md:ml-0 lg:flex">
          {!isAuthenticated ? (
            // Sign In Button (Visible when not logged in)
            <button
              className="text-base border px-4 py-2 bg-[#011638] text-white font-semibold rounded-lg shadow-lg w-40 transition-all duration-300 hover:scale-105"
              onClick={handleNavigation}
            >
              Sign In Now
            </button>
          ) : (
            <>
              {/* Profile Button */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 px-1 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300"
                  onClick={toggleDropdown}
                >
                  {userProfilepic ? (
                    <img
                      src={userProfilepic}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border border-gray-300"
                    />
                  ) : (
                    <User className="w-10 h-10 text-gray-500" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200">
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <button
                          onClick={goToDashboard}
                          className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                        >
                          <User className="w-5 h-5 mr-2" />
                          Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                        >
                          <LogOut className="w-5 h-5 mr-2" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
