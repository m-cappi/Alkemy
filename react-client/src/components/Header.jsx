import React from "react";
import { NavLink } from "react-router-dom";
import TransactionNew from "./TransactionNew";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-warning ">
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
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                activeClassName="active text-white"
                                className="nav-link"
                                to="/home"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                activeClassName="active text-white"
                                className="nav-link"
                                to="/income"
                            >
                                Income
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                activeClassName="active text-white"
                                className="nav-link"
                                to="/expense"
                            >
                                Expense
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                activeClassName="active text-white"
                                className="nav-link"
                                to="/test"
                            >
                                Test
                            </NavLink>
                        </li>
                    </ul>
                    <div>
                        <TransactionNew />
                        {/* Logout */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default React.memo(Header);
