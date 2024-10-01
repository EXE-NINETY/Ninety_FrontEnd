import React from "react";
import { Image, NavDropdown } from "react-bootstrap";

const CustomNavbar = () => {
    return (
        <nav
            className="navbar navbar-expand-xxl navbar-dark"
            aria-label="Seventh navbar example"
            style={{ backgroundColor: '#5BBE01' }}
        >
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Expand at xxl
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
                    <ul className="navbar-nav me-auto mb-2 mb-xl-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Link
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">
                                Disabled
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Action
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Another action
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Something else here
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <form role="search">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </form>
                    <div className="d-flex">
                        <Image
                            src="../logo192.png"
                            alt="123"
                            width="30"
                            height="30"
                            rounded
                            className="me-2"
                        />
                        <NavDropdown title="Minh Duy" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Hồ sơ</NavDropdown.Item>
                            <NavDropdown.Item href="/Login">Đăng xuất</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default CustomNavbar;
