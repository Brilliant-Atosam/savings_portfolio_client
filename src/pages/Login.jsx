import { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
import useAccount from "../hooks/useAccount";
const Login = () => {
  const { login } = useAccount();

  const [email, setEmail] = useState("jonsnow@hbo.got");
  const [password, setPassword] = useState("samsam1");
  return (
    <div className="main-container">
      <div className="login-container">
        <div className="login-form-container">
          <h1 className="login-text">Login to continue</h1>
          <input
            type="text"
            placeholder="jonsnow@gmail.com"
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
          <button className="login-btn" onClick={() => login(email, password)}>
            login
          </button>
          <div className="login-redirects">
            <Link to="/register">Create new account</Link>
            <Link to="/password/forgot">Forgot password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
