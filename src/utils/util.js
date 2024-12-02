import { useState } from "react";
import {
  SelfImprovement,
  BabyChangingStation,
  CardGiftcard,
  AddCard,
  School,
  Tv,
  Watch,
  RamenDining,
  HealthAndSafety,
  Apartment,
  ConstructionOutlined,
  VolunteerActivism,
  Devices,
  Commute,
  BeachAccess,
  ElectricalServices,
  WorkOutline,
  MiscellaneousServices,
  Blender,
  WifiPassword,
  Weekend,
  MobileScreenShareOutlined,
  SavingsOutlined,
  AddBusinessOutlined,
  EngineeringOutlined,
  GavelOutlined,
  Inventory2Outlined,
  SecurityOutlined,
  BuildOutlined,
  ChecklistOutlined,
  PaymentsOutlined,
  LocalShippingOutlined,
  AccountBalanceWalletOutlined,
  DirectionsCarFilledOutlined,
  BathtubOutlined,
  ColorLensOutlined,
  VolunteerActivismOutlined,
} from "@mui/icons-material";
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

  const storeLent = (data) => {
    window.localStorage.setItem("lent", JSON.stringify(data));
  };
  const storeBorrowed = (data) => {
    window.localStorage.setItem("borrowed", JSON.stringify(data));
  };
  // store expenses
  const storeExpenses = (data) =>
    localStorage.setItem("expenses", JSON.stringify(data));
  // store budget
  const storeBudget = (data) =>
    localStorage.setItem("budgets", JSON.stringify(data));
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
    "Business Revenue",
    "Interest/dividends/capital gain",
    "Rental",
    "Royalties",
    "Pension/Retirement",
    "Social Security",
    "Alimony/child Support",
    "Gifts and Inheritance",
    "Scholarships and Grants",
    "Miscellaneous",
    "Loans Received",
  ];
  // income sources for business
  const businessIncomeSources = [
    "Ad Revenue",
    "Affiliate Marketing",
    "Asset Sales",
    "Commission Income",
    "Consultation Fees",
    "Crowdfunding",
    "Donations",
    "Earnings from Partnerships",
    "Franchise Fees",
    "Gift Cards & Vouchers",
    "Grants",
    "Investment Income",
    "Licensing & Royalties",
    "Product Sales",
    "Rentals",
    "Service Revenue",
    "Sponsorship",
    "Subscription Fees",
    "Loans Received",
  ];

  // categories of expenses
  const categories = [
    { title: "Airtime & Internet ", icon: WifiPassword },
    { title: "Charity", icon: CardGiftcard },
    { title: "Childcare", icon: BabyChangingStation },
    { title: "Clothing & Fashion Accessories", icon: Watch },
    { title: "Cosmetics", icon: ColorLensOutlined },
    { title: "Debt Payment", icon: AddCard },
    { title: "Education & Personal Development", icon: School },
    { title: "Entertainment & Leisure", icon: Tv },
    { title: "Food & Groceries", icon: RamenDining },
    { title: "Gifts & Donations", icon: CardGiftcard },
    { title: "Healthcare & Insurance", icon: HealthAndSafety },
    { title: "Home Improvement & Appliances", icon: Weekend },
    { title: "Household & kitchen Items", icon: Blender },
    { title: "Housing", icon: Apartment },
    { title: "Miscellaneous", icon: MiscellaneousServices },
    { title: "Personal Care", icon: SelfImprovement },
    { title: "Repairs & Maintenance", icon: ConstructionOutlined },
    { title: "Savings & Investments", icon: SavingsOutlined },
    { title: "Technology", icon: Devices },
    { title: "Tithe & Offering", icon: VolunteerActivism },
    { title: "Toiletries", icon: BathtubOutlined },
    { title: "Transportation", icon: Commute },
    { title: "Utilities", icon: ElectricalServices },
    { title: "Vacation", icon: BeachAccess },
    { title: "Work Related", icon: WorkOutline },
  ];
  // categories for small businesses
  const businessExpenseCategories = [
    { title: "Advertising & Marketing", icon: AddBusinessOutlined },
    {
      title: "Bank & Transaction Charges Fees",
      icon: MobileScreenShareOutlined,
    },
    { title: "Contract Labor", icon: EngineeringOutlined },
    { title: "Donations & Sponsorship", icon: VolunteerActivismOutlined },
    { title: "Equipment Purchases", icon: BuildOutlined },
    { title: "Insurance", icon: SecurityOutlined },
    { title: "Inventory", icon: Inventory2Outlined },
    { title: "Office Supplies", icon: ChecklistOutlined },
    { title: "Professional Fees", icon: GavelOutlined },
    { title: "Rent or Lease Payments", icon: Apartment },
    { title: "Repairs & Maintenance", icon: ConstructionOutlined },
    { title: "Salaries & Wages", icon: PaymentsOutlined },
    { title: "Shipping & Delivery", icon: LocalShippingOutlined },
    { title: "Taxes", icon: AccountBalanceWalletOutlined },
    { title: "Utilities", icon: ElectricalServices },
    { title: "Vehicle Expenses", icon: DirectionsCarFilledOutlined },
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
    Number(amount).toLocaleString(locale || user?.currency?.locale || "en-GH", {
      style: "currency",
      currency: currency || user?.currency?.currency || "GHS",
    });
  // dummy data for pie chart of basic users
  const piechart_data = [
    {
      title: "Rent renewal",
      amount: 6000,
    },
    {
      title: "Investment fund",
      amount: 18000,
    },
    {
      title: "Vacation",
      amount: 5400,
    },
    {
      title: "Emergency fund",
      amount: 5400,
    },
  ];
  // dummy data for area chart of basic users
  const dummy_monthly_data = [
    {
      title: "Jan",
      id: "01",
      total_savings: 1760,
      total_income: 3420,
      total_expenses: 1240,
    },

    {
      title: "Feb",
      id: "02",
      total_savings: 1930,
      total_income: 4015,
      total_expenses: 1355,
    },

    {
      title: "Mar",
      id: "03",
      total_savings: 1742.46,
      total_income: 3450.4,
      total_expenses: 490,
    },

    {
      title: "Apr",
      id: "04",
      total_savings: 1313,
      total_income: 2600,
      total_expenses: 1400,
    },

    {
      title: "May",
      id: "05",
      total_savings: 2546,
      total_income: 4504,
      total_expenses: 459,
    },

    {
      title: "Jun",
      id: "06",
      total_savings: 1454,
      total_income: 2840,
      total_expenses: 764,
    },

    {
      title: "Jul",
      id: "07",
      total_savings: 2780,
      total_income: 4670,
      total_expenses: 1050,
    },
    {
      title: "Aug",
      id: "08",
      total_savings: 1900,
      total_income: 3712,
      total_expenses: 896,
    },
    {
      title: "Sep",
      id: "09",
      total_savings: 2230,
      total_income: 3455,
      total_expenses: 1205,
    },
    {
      title: "Oct",
      id: "10",
      total_savings: 1250,
      total_income: 3630,
      total_expenses: 1104,
    },
    {
      title: "Nov",
      id: "11",
      total_savings: 1505,
      total_income: 4045,
      total_expenses: 2570,
    },
    {
      title: "Dec",
      id: "12",
      total_savings: 2105,
      total_income: 4506,
      total_expenses: 2350,
    },
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
    categories,
    storeExpenses,
    months,
    format_currency,
    sources_of_income,
    currencies,
    user,
    piechart_data,
    dummy_monthly_data,
    storeLent,
    storeBorrowed,
    businessExpenseCategories,
    storeBudget,
    businessIncomeSources,
  };
};

export default Util;
