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
    "#00b377",
    "#ff3399",
    "#bf00ff",
    "#13a7c9",
    "#8060f5",
    "#df16f1",
    "#116d89",
    "teal",
    "#4da6ff",
  ];
  // income sources
  const sources_of_income = [
    "Salary/Wages/Allowance",
    "Profits/Self-employment",
    "Side Jobs/Freelance",
    "Interest/dividends/capital gain",
    "Rental",
    "Royalties",
    "Pension/Retirement",
    "Social Security",
    "Alimony/child Support",
    "Gifts and Inheritance",
    "Scholarships and Grants",
    "Miscellaneous ",
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
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // currency formatter
  const format_currency = (amount) =>
    Number(amount).toLocaleString("en-GH", {
      style: "currency",
      currency: "GHS",
    });
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
    months,
    format_currency,
    sources_of_income,
  };
};

export default Util;
