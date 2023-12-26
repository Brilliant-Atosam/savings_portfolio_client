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
  // store expenses
  const storeExpenses = (data) =>
    localStorage.setItem("expenses", JSON.stringify(data));
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
    "#bf00ff",
    "#ff3385",
    "#ff4dff",
    "teal",
    "#4da6ff",
    "#4080bf",
    "#00b377",
    "#00cca3",
  ];
  // categories of expenses
  const categories = [
    "charity",
    "childcare",
    "debt payment",
    "education",
    "entertainment",
    "fashion",
    "food",
    "healthcare",
    "housing",
    "insurance",
    "miscellaneous",
    "offering",
    "personal care",
    "technology",
    "transportation",
    "travel",
    "utilities",
    "work related",
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
    categories,
    storeExpenses,
  };
};

export default Util;
