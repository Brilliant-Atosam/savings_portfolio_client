import useAccount from "../hooks/useAccount";
import { Link } from "react-router-dom";
import useApp from "../useApp";
import { CircularProgress } from "@mui/material";
const Create = () => {
  const { loading } = useApp();
  const { register, newUser, setNewUser } = useAccount();
  return (
    <div className="main-container">
      <div className="login-container">
        <div className="login-form-container">
          <h1 className="login-text">Create new account</h1>
          <input
            type="text"
            placeholder="Jon snow"
            className="login-input"
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="jonsnow@hbo.got"
            className="login-input"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="0544006865"
            className="login-input"
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="login-input"
            onChange={(e) =>
              setNewUser({ ...newUser, password2: e.target.value })
            }
          />
          <button className="login-btn" onClick={register} disabled={loading}>
            {loading ? "loading..." : "Create account"}
          </button>
          <Link to="/login">Login</Link>
        </div>
        <div className="loading-container">
          {loading && <CircularProgress color="primary" />}
        </div>
      </div>
    </div>
  );
};

export default Create;
