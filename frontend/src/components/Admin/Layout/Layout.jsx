import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="dashboard">
      <Header />
      <div className="d-flex flex-grow-1">
        <SideBar />
        <div className="main-content w-100">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
