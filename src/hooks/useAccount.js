import Util from "../utils/util";
import useApp from "../useApp";
import request from "../utils/request";
import { useState } from "react";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import useFeedback from "./useFeedback";
const useAccount = () => {
  // regular expressions
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)([a-z\d]|[A-Z]|[^\w\s]).{6,}$/;
  const phoneRegex = /^\d{10}$/;
  const nameRegex = /^[A-Za-z\s',.-]{3,}$/;

  const location = useLocation();
  const navigate = useNavigate();
  const reset_code = new URLSearchParams(location.search).get("reset_code");
  const {
    storeUser,
    storeSavings,
    storeExpenses,
    storeBorrowed,
    storeLent,
    storeBudget,
  } = Util();
  const { handleLoader } = useApp();
  const { handleSnackbar, snackbar } = useFeedback();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    currency: {},
    id: Math.floor(Math.random() * 9999).toString(),
    createdAt: moment(new Date()).format("DD/MM/YYYY"),
    purpose: "",
  });
  //   login
  const login = async (email, password) => {
    handleLoader();
    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
      handleSnackbar("Invalid email or password!", "warning");
    } else
      try {
        const res = await request.post("/auth/login", {
          email,
          password,
        });
        storeUser(res.data);
        handleSnackbar("Login successful. Loading user data!", "success");
        storeUser(res.data);
        const savingsRes = await request.get(`/savings?userId=${res.data.id}`, {
          headers: {
            access_token: `Bearer ${res.data.access_token}`,
          },
        });

        const lent = await request.get(`/loan/lent?userId=${res.data.id}`, {
          headers: { access_token: `Bearer ${res.data.access_token}` },
        });
        const budgets = await request.get(`/budget?userId=${res.data.id}`, {
          headers: { access_token: `Bearer ${res.data.access_token}` },
        });
        const expenses = await request.get(`/expenses?userId=${res.data.id}`, {
          headers: { access_token: `Bearer ${res.data.access_token}` },
        });
        const borrowed = await request.get(
          `/loan/borrowed?userId=${res.data.id}`,
          {
            headers: { access_token: `Bearer ${res.data.access_token}` },
          }
        );

        storeSavings(savingsRes.data);
        storeBorrowed(borrowed.data);
        storeLent(lent.data);
        storeBudget(budgets.data);
        storeExpenses(expenses.data);
        navigate("/");
      } catch (err) {
        handleSnackbar(
          err.response ? err.response.data : err.message,
          "warning"
        );
      }
    handleLoader();
    // handleSnackbar("", "info");
  };
  // logout
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };

  // create a new user
  const register = async (newUser) => {
    handleLoader();
    if (
      !nameRegex.test(newUser.name) ||
      !emailRegex.test(newUser.email) ||
      !phoneRegex.test(newUser.phone) ||
      !passwordRegex.test(newUser.password)
    ) {
      handleSnackbar("Please provide valid info.", "warning");
    } else if (newUser.password !== newUser.password2) {
      handleSnackbar("Passwords do not match!", "warning");
    } else {
      try {
        await request.post("/auth", newUser);
        navigate("/login");
      } catch (err) {
        handleSnackbar(err.response ? err.response.data : err.message, "error");
      }
    }
    handleLoader();
  };
  // reset password request
  const handlePasswordResetRequest = async () => {
    handleLoader();
    if (!email) {
      handleSnackbar("Enter a valid email address", "warning");
      handleLoader();
    } else {
      try {
        const res = await request.post("/auth/reset", { email });
        handleSnackbar(res.data, "success");
        handleLoader();
      } catch (err) {
        handleSnackbar(err.response ? err.response.data : err.message, "error");
        handleLoader();
      }
    }
  };
  // handle reset password
  const handleResetPassword = async () => {
    handleLoader();
    if (password !== password2 || !password || !password2) {
      handleSnackbar("Invalid password or passwords do not match!", "warning");
    } else if (reset_code.length < 5) {
      handleSnackbar("Invalid reset link.", "warning");
    } else {
      try {
        const res = await request.put("/auth/reset", { password, reset_code });
        handleSnackbar(res.data, "success");
      } catch (err) {
        handleSnackbar(err.response ? err.response.data : err.message, "error");
      }
    }
    handleLoader();
  };
  return {
    login,
    handleLogout,
    register,
    email,
    setEmail,
    handlePasswordResetRequest,
    handleResetPassword,
    password,
    setPassword,
    password2,
    setPassword2,
    newUser,
    setNewUser,
    snackbar,
    handleSnackbar,
  };
};

export default useAccount;
