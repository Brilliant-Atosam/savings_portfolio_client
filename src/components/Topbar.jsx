import { useState } from "react";
import { Menu } from "@mui/icons-material";
import useApp from "../useApp";
import useAccount from "../hooks/useAccount";
import { Link } from "react-router-dom";
const Topbar = () => {
  const { handlePortfolioDialog } = useApp();
  const { handleLogout } = useAccount();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div className="topbar-container">
        <Link to="/" className="logo-text">
          cashlens
        </Link>
        <div className="topbar-left">
          <button className="topbar-btn" onClick={handlePortfolioDialog}>
            create portfolio
          </button>
          <Menu className="menu-icon" onClick={() => setShowMenu(!showMenu)} />
        </div>
      </div>
      {showMenu && (
        <div className="side-menu-container">
          <Link to="/" className="menu-item">
            Home
          </Link>
          <Link to="/expenses" className="menu-item">
            Expenses
          </Link>
          <Link to="/loan" className="menu-item">
            Loan
          </Link>
          <Link to="/settings" className="menu-item">
            Account Info & Settings
          </Link>
          <li className="menu-item" onClick={handleLogout}>
            Logout
          </li>
        </div>
      )}
    </>
  );
};

export default Topbar;
