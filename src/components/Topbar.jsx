import { useState } from "react";
import { Menu } from "@mui/icons-material";
import useAccount from "../hooks/useAccount";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import { BsDatabaseFillAdd } from "react-icons/bs";
import usePortfolio from "../hooks/usePortfolio";
import AddPortfolioDialog from "./AddPortfolioDialog";
const Topbar = () => {
  const { handlePortfolioDialog, showPortfolioDialog, addPortfolio } =
    usePortfolio();
  const { handleLogout } = useAccount();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div className="topbar-container">
        <Link to="/" className="logo-text">
          <img src={logo} alt="cashlens logo" className="top-bar-logo" />{" "}
          cashlens
        </Link>
        <div className="topbar-left">
          <BsDatabaseFillAdd
            fill="white"
            size={22}
            onClick={handlePortfolioDialog}
          />
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
          <Link to="/budget" className="menu-item">
            Budget
          </Link>
          <Link to="/settings" className="menu-item">
            Account Info & Settings
          </Link>
          <Link to="/contact" className="menu-item">
            Contact us
          </Link>
          <Link to="/exchange" className="menu-item">
            Exchange rate
          </Link>
          <li className="menu-item" onClick={handleLogout}>
            Logout
          </li>
        </div>
      )}
      <AddPortfolioDialog
        open={showPortfolioDialog}
        close={handlePortfolioDialog}
        action={addPortfolio}
      />
    </>
  );
};

export default Topbar;
