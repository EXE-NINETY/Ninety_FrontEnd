import React from "react";
import CustomNavbar from "./CustomNavbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="all-container">
            <CustomNavbar />
            <div className="content-container">
                <div className="App-header">
                    <Outlet /> {/* Nội dung trang sẽ được render ở đây */}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;