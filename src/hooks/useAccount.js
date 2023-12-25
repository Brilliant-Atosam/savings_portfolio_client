import Util from "../utils/util";
import useApp from "../useApp";
import request from "../utils/request";
import { useState } from "react";

const useAccount = () => {
  const { storeUser, storeSavings, storeLoan } = Util();
  const { handleSnackbar, handleLoader } = useApp();
  //   login
  const login = async (email, password) => {
    handleLoader();
    try {
      const res = await request.post("/auth/login", {
        email,
        password,
      });
      const savingsRes = await request.get(`/savings?userId=${res.data.id}`, {
        headers: {
          access_token: `Bearer ${res.data.access_token}`,
        },
      });
      const loans = await request.get(`/loan?userId=${res.data.id}`, {
        headers: { access_token: `Bearer ${res.data.access_token}` },
      });
      storeSavings(savingsRes.data);
      storeLoan(loans.data);
      storeUser(res.data);
      handleSnackbar("Login successful!", "success");
      handleLoader();
    } catch (err) {
      handleLoader();
      handleSnackbar(err.response ? err.response.data : err.message, "warning");
    }
  };
  // logout
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };

  // create a new user
  const register = async (newUser) => {
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
        window.location.href = "/login";
      } catch (err) {
        handleSnackbar(err.response ? err.response.data : err.message, "error");
        handleLoader();
      }
    }
  };
  // reset password request
  const [email, setEmail] = useState("");
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
  const handleResetPassword = async (password, password2, reset_code) => {
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
  };
};

export default useAccount;
