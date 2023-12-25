import { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
import useAccount from "../hooks/useAccount";
import { useLocation } from "react-router-dom";
import useApp from "../useApp";
import { CircularProgress } from "@mui/material";
const ResetPassword = () => {
  const { handleResetPassword } = useAccount();
  const { loading } = useApp();
  const location = useLocation();
  const reset_code = new URLSearchParams(location.search).get("reset_code");
  const [password, setPassword] = useState("samsam1");
  const [password2, setPassword2] = useState("samsam1");
  return (
    <div className="main-container">
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
            onClick={() => handleResetPassword(password, password2, reset_code)}
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
