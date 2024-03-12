import { useState } from "react";

const Util = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
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
  const currencies = [
    { name: "Ghanaian Cedi", locale: "en-GH", currency: "GHS" },
    { name: "Algerian Dinar", locale: "ar-DZ", currency: "DZD" },
    { name: "Angolan Kwanza", locale: "pt-AO", currency: "AOA" },
    { name: "Australian Dollar", locale: "en-AU", currency: "AUD" },
    { name: "Brazilian Real", locale: "pt-BR", currency: "BRL" },
    { name: "British Pound", locale: "en-GB", currency: "GBP" },
    { name: "Canadian Dollar", locale: "en-CA", currency: "CAD" },
    { name: "Chinese Yuan", locale: "zh-CN", currency: "CNY" },
    { name: "Egyptian Pound", locale: "ar-EG", currency: "EGP" },
    { name: "Euro", locale: "en-DE", currency: "EUR" },
    { name: "Ethiopian Birr", locale: "am-ET", currency: "ETB" },
    { name: "Indian Rupee", locale: "en-IN", currency: "INR" },
    { name: "Japanese Yen", locale: "ja-JP", currency: "JPY" },
    { name: "Kenyan Shilling", locale: "en-KE", currency: "KES" },
    { name: "Mexican Peso", locale: "es-MX", currency: "MXN" },
    { name: "Moroccan Dirham", locale: "ar-MA", currency: "MAD" },
    { name: "New Zealand Dollar", locale: "en-NZ", currency: "NZD" },
    { name: "Nigerian Naira", locale: "en-NG", currency: "NGN" },
    { name: "Russian Ruble", locale: "ru-RU", currency: "RUB" },
    { name: "Senegalese CFA Franc", locale: "fr-SN", currency: "XOF" },
    { name: "Singapore Dollar", locale: "en-SG", currency: "SGD" },
    { name: "South African Rand", locale: "en-ZA", currency: "ZAR" },
    { name: "South Korean Won", locale: "ko-KR", currency: "KRW" },
    { name: "Swiss Franc", locale: "fr-CH", currency: "CHF" },
    { name: "Swedish Krona", locale: "sv-SE", currency: "SEK" },
    { name: "Tanzanian Shilling", locale: "en-TZ", currency: "TZS" },
    { name: "Turkish Lira", locale: "tr-TR", currency: "TRY" },
    { name: "Ugandan Shilling", locale: "en-UG", currency: "UGX" },
    { name: "US Dollar", locale: "en-US", currency: "USD" },
  ];
  const format_currency = (amount, locale, currency) =>
    Number(amount.toFixed(2)).toLocaleString(
      locale || user?.currency.locale || "en-GH",
      {
        style: "currency",
        currency: currency || user?.currency.currency || "GHS",
      }
    );
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
    currencies,
    user,
  };
};

export default Util;
