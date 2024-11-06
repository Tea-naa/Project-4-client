import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    // Function to handle collapsing the navbar on link click
    const handleLinkClick = () => {
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse.classList.contains('show')) {  // Check if the 'navbarNav' element currently has the class 'show'
            navbarCollapse.classList.remove('show'); //Removes it. Collapse navbar on link click
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                 {/* Navbar brand, links to home and collapses navbar on click */}
                <Link className="navbar-brand killer-knowledge" to="/" onClick={handleLinkClick}>
                    Killer Knowledge
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={handleLinkClick}>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register" onClick={handleLinkClick}>Register</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/dashboard" onClick={handleLinkClick}>Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/insert" onClick={handleLinkClick}>Insert</Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
