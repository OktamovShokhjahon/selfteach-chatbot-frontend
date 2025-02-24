import React from "react";
import Navbar from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";

const Layout = ({
  children,
  history,
  onHistoryClick,
  sidebarOpen,
  onCloseSidebar,
  setSidebarOpen,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <Navbar />

      <div className="flex flex-col md:flex-row">
        {/* Mobile Sidebar Toggle */}
        <button
          className="md:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-blue-500 hover:bg-blue-600 dark:bg-indigo-500 text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>

        {sidebarOpen && (
          <Sidebar
            history={history}
            onHistoryClick={onHistoryClick}
            sidebarOpen={sidebarOpen}
            onCloseSidebar={onCloseSidebar}
          />
        )}

        <main className="flex-1 p-4 md:p-8 md:ml-0">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
