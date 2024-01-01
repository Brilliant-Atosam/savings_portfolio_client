import "../styles/login.css";
import { Link } from "react-router-dom";
import useAccount from "../hooks/useAccount";
import useApp from "../useApp";
import { CircularProgress } from "@mui/material";
import Navbar from "../components/Navbar";
const ResetPassword = () => {
  const {
    handleResetPassword,
    password,
    password2,
    setPassword,
    setPassword2,
  } = useAccount();
  const { loading } = useApp();
  return (
    <div className="main-container">
      <Navbar />
      <div className="login-container">
        <div className="login-form-container">
          <h1 className="login-text">Reset Password</h1>
          <input
            type="password"
            placeholder="New password"
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="login-input"
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
          />
          <button
            className="login-btn"
            onClick={handleResetPassword}
            disabled={loading}
          >
            {loading ? "loading" : "Reset"}
          </button>
          <div className="login-redirects">
            <Link to="/login">Remembered password</Link>
          </div>
          <div className="loading-container">
            {loading && <CircularProgress color="primary" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
