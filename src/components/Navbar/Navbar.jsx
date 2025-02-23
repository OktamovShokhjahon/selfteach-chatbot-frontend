import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = false; // Replace with your auth logic

  const handleLogout = () => {
    // Add logout logic here
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                SelfTeach
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
