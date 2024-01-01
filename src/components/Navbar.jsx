import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
const Navbar = () => {
  return (
    <div className="topbar-container">
      <Link to="/" className="logo-text">
        <img src={logo} alt="cashlens logo" className="top-bar-logo" />
        cashlens
      </Link>
      <Link to="/login" className="topbar-btn">
        log in
      </Link>
    </div>
  );
};

export default Navbar;
