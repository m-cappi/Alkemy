import React from "react";
import { NavLink } from "react-router-dom";

const AuthHeader = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-info">
            <div className="container-fluid">
                <h2 className="navbar-brand">Alkemy Challenge</h2>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse d-md-flex flex-md-row justify-content-md-between align-content-md-center "
                    id="navbarNav"
                >
                    <ul className="navbar-nav gap-1 mx-5">
                        <li className="nav-item">
                            <NavLink
                                activeClassName="active text-white "
                                className="nav-link"
                                to="/auth/signin"
                            >
                                SignIn
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                activeClassName="active text-white"
                                className="nav-link"
                                to="/auth/signup"
                            >
                                SignUp
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default AuthHeader;
