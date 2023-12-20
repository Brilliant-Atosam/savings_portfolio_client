import { useState } from "react";
import useAccount from "../hooks/useAccount";
import { Link } from "react-router-dom";
const Create = () => {
  const { register } = useAccount();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    id: Math.floor(Math.random() * 9999).toString(),
  });

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
          <button className="login-btn" onClick={() => register(newUser)}>
            Create account
          </button>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Create;
