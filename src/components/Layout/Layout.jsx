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
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col md:flex-row">
        <Sidebar
          history={history}
          onHistoryClick={onHistoryClick}
          sidebarOpen={sidebarOpen}
          onCloseSidebar={onCloseSidebar}
        />

        <main className="flex-1 p-4 md:p-8 md:ml-0">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
