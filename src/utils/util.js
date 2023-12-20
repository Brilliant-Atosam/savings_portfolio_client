import { useState } from "react";

const Util = () => {
  // feedback/snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [feedback, setFeedback] = useState("");
  const handleSnackbar = (feedback) => {
    setOpenSnackbar((prev) => !prev);
    setFeedback(feedback);
  };
  // store user
  const storeUser = (data) => {
    window.localStorage.setItem("user", JSON.stringify(data));
  };
  // store savings
  const storeSavings = (data) => {
    window.localStorage.setItem("savings", JSON.stringify(data));
  };
  // store loans
  const storeLoan = (data) => {
    window.localStorage.setItem("loans", JSON.stringify(data));
  };

  // handle confirm dialog
  const [confirmData, setConfirmData] = useState({
    open: false,
    heading: "",
    warning: "",
    item: null,
  });
  const colors = [
    "#3399ff",
    "#ff3399",
    "teal",
    "#bf00ff",
    "#ff3385",
    "#ff4dff",
    "#4da6ff",
    "#4080bf",
    "#00b377",
    "#00cca3",
  ];
  return {
    storeUser,
    handleSnackbar,
    feedback,
    openSnackbar,
    storeSavings,
    confirmData,
    setConfirmData,
    setFeedback,
    colors,
    storeLoan,
  };
};

export default Util;
