import React from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {/* Toggle/Close Button - only visible on mobile */}
            <button
              className="md:hidden p-2 rounded-lg bg-blue-500 hover:bg-blue-600 dark:bg-indigo-500 text-white"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? "✕" : "☰"}
            </button>

            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                SelfTeach
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
