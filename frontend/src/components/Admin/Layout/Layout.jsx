import React from "react";
import SideBar from "../SideBar/SideBar";
import { ToastProvider } from "../../User/Common/Toast";

const AdminLayout = ({ children }) => {
  return (
    <ToastProvider>
      <div style={{
        display: "flex", minHeight: "100vh",
        background: "var(--bg)", color: "var(--text)",
      }}>
        <SideBar />
        <div style={{
          flex: 1, minWidth: 0, overflowX: "hidden",
          background: "var(--bg)",
        }}>
          {children}
        </div>
      </div>
    </ToastProvider>
  );
};

export default AdminLayout;
