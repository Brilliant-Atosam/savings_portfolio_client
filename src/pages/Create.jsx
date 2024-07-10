import useAccount from "../hooks/useAccount";
import { Link } from "react-router-dom";
import useApp from "../useApp";
import { CircularProgress } from "@mui/material";
import Navbar from "../components/Navbar";
import Util from "../utils/util";
import Feedback from "../components/Feedback";
const Create = () => {
  const { loading } = useApp();
  const { register, newUser, setNewUser, snackbar, handleSnackbar } =
    useAccount();
  const { currencies } = Util();
  return (
    <div className="main-container">
      <Navbar />
      <div className="login-container">
        <div className="login-form-container">
          <h1 className="login-text">Create new account</h1>
          <input
            type="text"
            placeholder="Full name"
            className="login-input"
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone number"
            className="login-input"
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />
          <select
            type="text"
            placeholder="Preferred currency"
            className="login-input"
            onChange={(e) =>
              setNewUser({
                ...newUser,
                currency: currencies.find(
                  (currency) => currency.name === e.target.value
                ),
              })
            }
          >
            <option value="">Choose your preferred currency</option>
            {currencies.map((currency, index) => (
              <option value={currency.name} key={index}>
                {currency.name}
              </option>
            ))}
          </select>
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
          <button
            className="login-btn"
            onClick={() => register(newUser)}
            disabled={loading}
          >
            {loading ? "loading..." : "Create account"}
          </button>
          <Link to="/login">Login</Link>
        </div>
        <div className="loading-container">
          {loading && <CircularProgress color="primary" />}
        </div>
      </div>
      <Feedback
        snackbar={snackbar}
        toggler={() => handleSnackbar("", "info")}
      />
    </div>
  );
};

export default Create;
