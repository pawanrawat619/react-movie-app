import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
