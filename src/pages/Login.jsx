import "../styles/login.css";
import { Link } from "react-router-dom";
import useAccount from "../hooks/useAccount";
import { CircularProgress } from "@mui/material";
import useApp from "../useApp";
import logo from "../logo1.png";
import Navbar from "../components/Navbar";
const Login = () => {
  const { login, setEmail, setPassword, email, password } = useAccount();
  let { loading } = useApp();
  return (
    <div className="main-container">
      <Navbar />
      <div className="login-container">
        <div className="login-form-container">
          <img src={logo} alt="cashlens logo" className="login-logo" />
          <h1 className="login-text">Welcome! Please log in.</h1>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            disabled={loading}
            className="login-btn"
            onClick={() => login(email, password)}
          >
            {loading ? "loading..." : "login"}
          </button>
          <div className="login-redirects">
            <Link to="/register">Register</Link>
            <Link to="/password/forgot">Forgot password?</Link>
          </div>
          <div className="loading-container">
            {loading && <CircularProgress color="primary" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
