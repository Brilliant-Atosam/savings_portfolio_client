import { useState } from "react";
import { Menu } from "@mui/icons-material";
import useAccount from "../../hooks/useAccount";
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import Util from "../../utils/util";
const PartnersTopbar = () => {
  const { handleLogout } = useAccount();
  const { format_currency } = Util();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div className="topbar-container">
        <Link to="/" className="logo-text">
          <img src={logo} alt="cashlens logo" className="top-bar-logo" />{" "}
          partners
        </Link>
        <div className="topbar-left">
          <button className="topbar-btn">Bal: {format_currency(450)}</button>
          <Menu className="menu-icon" onClick={() => setShowMenu(!showMenu)} />
        </div>
      </div>
      {showMenu && (
        <div className="side-menu-container">
          <Link to="/" className="menu-item">
            Back to cashlens
          </Link>
          <Link to="/expenses" className="menu-item">
            resources
          </Link>
          <Link to="/contact" className="menu-item">
            Contact us
          </Link>
          <li className="menu-item" onClick={handleLogout}>
            Logout
          </li>
        </div>
      )}
    </>
  );
};

export default PartnersTopbar;
