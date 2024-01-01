import { Link } from "react-router-dom";
import useAccount from "../hooks/useAccount";
import useApp from "../useApp";
import { CircularProgress } from "@mui/material";
import Navbar from "../components/Navbar";
const ForgotPassword = () => {
  const { loading } = useApp();
  const { email, setEmail, handlePasswordResetRequest } = useAccount();
  return (
    <div className="main-container">
      <Navbar />
      <div className="login-container">
        <div className="login-form-container">
          <h1 className="login-text">Enter your email to continue</h1>
          <input
            type="text"
            placeholder="jonsnow@gmail.com"
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button
            className="login-btn"
            onClick={handlePasswordResetRequest}
            disabled={loading}
          >
            {loading ? "loading..." : "send reset link"}
          </button>
          <div className="login-redirects">
            <Link to="/login">Login</Link>
            <Link to="/register">Create new account</Link>
          </div>
          <div className="loading-container">
            {loading && <CircularProgress color="primary" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
