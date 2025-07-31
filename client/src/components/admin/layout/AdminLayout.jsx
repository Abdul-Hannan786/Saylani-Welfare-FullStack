import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import MobileNavigation from "../MobileNavigation";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden relative">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <MobileNavigation />
        <div className="flex-1 overflow-auto px-4 py-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
