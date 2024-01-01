import Util from "../utils/util";
import useApp from "../useApp";
import request from "../utils/request";
import { useState } from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";

const useAccount = () => {
  const location = useLocation();
  const reset_code = new URLSearchParams(location.search).get("reset_code");
  const { storeUser, storeSavings, storeLoan, storeExpenses } = Util();
  const { handleSnackbar, handleLoader } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    id: Math.floor(Math.random() * 9999).toString(),
    createdAt: moment(new Date()).format("DD/MM/YYYY"),
  });
  //   login
  const login = async () => {
    handleLoader();
    try {
      const res = await request.post("/auth/login", {
        email,
        password,
      });
      handleSnackbar("Login successful!", "success");
      const savingsRes = await request.get(`/savings?userId=${res.data.id}`, {
        headers: {
          access_token: `Bearer ${res.data.access_token}`,
        },
      });
      const loans = await request.get(`/loan?userId=${res.data.id}`, {
        headers: { access_token: `Bearer ${res.data.access_token}` },
      });
      const expenses = await request.get(`/expenses?userId=${res.data.id}`, {
        headers: { access_token: `Bearer ${res.data.access_token}` },
      });
      storeSavings(savingsRes.data);
      storeLoan(loans.data);
      storeExpenses(expenses.data);
      storeUser(res.data);
      handleLoader();
    } catch (err) {
      handleLoader();
      handleSnackbar(err.response ? err.response.data : err.message, "warning");
    }
  };
  // logout
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  // create a new user
  const register = async () => {
    handleLoader();
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.phone ||
      !newUser.password
    ) {
      handleSnackbar("Provide value for all fields.", "warning");
      handleLoader();
    } else {
      try {
        await request.post("/auth", newUser);
        window.location.href = "/";
      } catch (err) {
        handleSnackbar(err.response ? err.response.data : err.message, "error");
        handleLoader();
      }
    }
  };
  // reset password request
  // const [email, setEmail] = useState("");
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
      handleLoader();
    } else if (reset_code.length < 5) {
      handleSnackbar("Invalid reset link.", "warning");
      handleLoader();
    } else {
      try {
        const res = await request.put("/auth/reset", { password, reset_code });
        handleSnackbar(res.data, "success");
        handleLoader();
      } catch (err) {
        handleLoader();
        handleSnackbar(err.response ? err.response.data : err.message, "error");
      }
    }
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
  };
};

export default useAccount;
