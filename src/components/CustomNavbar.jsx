import React from "react";
import { Image, NavDropdown } from "react-bootstrap";
import { FaHome, FaLink, FaMoneyBillAlt, FaUser } from 'react-icons/fa';

const CustomNavbar = () => {
    const accountDTO = JSON.parse(sessionStorage.getItem('accountDTO'));

    return (
        <nav
            className="navbar navbar-expand-xxl navbar-light shadow-sm"
            style={{ backgroundColor: '#5BBE01' }}
        >
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center fw-bold" href="/" style={{ color: '#fff', fontSize: '1.5rem' }}>
                    <Image
                        src="../logo.jpg"
                        alt="Logo"
                        width="40"
                        height="40"
                        roundedCircle
                        className="me-2"
                    />
                    NINETY
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarsExampleXxl"
                    aria-controls="navbarsExampleXxl"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarsExampleXxl">
                    <ul className="navbar-nav me-auto mb-2 mb-xl-0 align-items-center">
                        <li className="nav-item">
                            <a className="nav-link text-light" aria-current="page" href="/">
                                <FaHome className="me-2" /> Home
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link text-light" href="/tournaments">
                                <FaLink className="me-2" /> Tournament
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link text-light" href="/teams">
                                <FaUser className="me-2" /> Team
                            </a>
                        </li>
                        {accountDTO.role === "Staff" && (
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/dashboard">
                                    <FaMoneyBillAlt className="me-2" /> Dashboard/Revenue
                                </a>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex align-items-center">
                        <NavDropdown
                            title={
                                <span className="text-white">
                                    <FaUser className="me-2" />
                                    Welcome, <span className="fw-bold">{accountDTO?.name || "Guest"}</span>
                                </span>
                            }
                            id="user-nav-dropdown"
                            align="end"
                        >
                            <NavDropdown.Item href="/about">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/Login">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default CustomNavbar;
