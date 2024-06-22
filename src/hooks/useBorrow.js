import moment from "moment";
import { useState } from "react";
import request from "../utils/request";
import Util from "../utils/util";
import useApp from "../useApp";
import useSettings from "./useSettings";
const useBorrow = () => {
  const borrowedList =
    JSON.parse(window.localStorage.getItem("borrowed")) || [];
  const lentList = JSON.parse(window.localStorage.getItem("lent")) || [];
  const { storeUser, storeLent, storeBorrowed, months } = Util();
  const context = useApp();
  let user = JSON.parse(window.localStorage.getItem("user"));
  let loans = JSON.parse(window.localStorage.getItem("loans"));
  const { total_savings } = useSettings();
  const [openBorrowDialog, setOpenBorrowDialog] = useState(false);
  // toggle form
  const [type, setType] = useState("lend");
  const toggleType = (type) => setType((prev) => type);
  const [settleType, setSettleType] = useState("settle");
  const toggleSettleType = (settle) => setSettleType(settle);
  const [settle, setSettle] = useState({
    settled_at: moment().format("DD/MM/YYYY"),
    amount: "",
    id: "",
  });

  const [getSettled, setGetSettled] = useState({
    settled_at: moment().format("DD/MM/YYYY"),
    amount: "",
    id: "",
  });
  const [loanDetails, setLoanDetails] = useState({
    amount: "",
    reason: "",
    repayment_date: "",
    createdAt: moment(new Date()).format("DD/MM/YYYY"),
    id: Math.floor(Math.random() * 9999).toString(),
    userId: user?.id,
    borrowed_from: "",
  });
  const [borrow, setBorrow] = useState({
    user_id: user?.id,
    id: Math.floor(Math.random() * 9999).toString(),
    lender: "",
    amount: 0,
    reason: "",
    date: moment().format("DD/MM/YYYY"),
    repayment_date: "",
  });
  const [lend, setLend] = useState({
    user_id: user?.id,
    id: Math.floor(Math.random() * 9999).toString(),
    borrower: "",
    amount: 0,
    reason: "",
    date: moment().format("DD/MM/YYYY"),
    repayment_date: "",
  });
  const handleOpenBorrowDialog = () => {
    setOpenBorrowDialog((prev) => !prev);
  };
  // lend money
  const lendMoney = async () => {
    context?.handleLoader();
    if (
      !lend.amount ||
      !lend.borrower ||
      !lend.reason ||
      !lend.repayment_date ||
      moment(lend.repayment_date).isBefore(moment().format("DD/MM/YYYY"))
    ) {
      context?.handleSnackbar(
        "Provide valid information for all fields.",
        "warning"
      );
    } else if (lend.amount > total_savings) {
      context?.handleSnackbar(
        "You cannot lend all or more than you have saved out",
        "warning"
      );
    } else {
      try {
        const res = await request.post("/loan/lend", lend, {
          headers: {
            access_token: `Bearer ${user.access_token}`,
          },
        });
        storeLent([...lentList, lend]);
        context?.handleSnackbar(res.data, "success");
      } catch (err) {
        context?.handleSnackbar(
          err.response ? err.response.data : "Network Error!",
          "error"
        );
      }
    }
    context?.handleLoader();
  };
  // lend money
  const borrowMoney = async (borrow) => {
    context?.handleLoader();
    if (
      !borrow.amount ||
      !borrow.lender ||
      !borrow.reason ||
      !borrow.repayment_date ||
      moment(borrow.repayment_date).isBefore(moment().format("DD/MM/YYYY"))
    ) {
      context?.handleSnackbar(
        "Provide valid information for all fields.",
        "warning"
      );
    } else {
      try {
        const res = await request.post("/loan/borrow", borrow, {
          headers: {
            access_token: `Bearer ${user.access_token}`,
          },
        });
        storeBorrowed([...borrowedList, borrow]);
        context?.handleSnackbar(res.data, "success");
      } catch (err) {
        context?.handleSnackbar(
          err.response ? err.response.data : "Network Error!",
          "error"
        );
      }
    }
    context?.handleLoader();
  };

  const [showSettleDialog, setShowSettleDialog] = useState(false);
  const handleSettleDialog = () => setShowSettleDialog((prev) => !prev);

  const [settleDetails, setSettleDetails] = useState({
    amount: "",
    createdAt: moment(new Date()).format("DD/MM/YYYY"),
    total_advance: user?.total_advance,
    balance: "",
    id: Math.floor(Math.random() * 999).toString(),
  });
  const settleAdvance = async () => {
    if (settleDetails.amount > user.total_advance) {
      context?.handleSnackbar("You cannot pay more than you owe", "warning");
    } else if (!settleDetails.amount) {
      context?.handleSnackbar("Enter amount", "warning");
    } else {
      user = {
        ...user,
        repayment_history: user?.repayment_history?.push(settleDetails) || [
          settleDetails,
        ],
        settled_advance: user.settled_advance + settleDetails.amount,
        amount_owed: settleDetails.balance,
        advance_balance: settleDetails.balance,
      };
      try {
        const res = await request.put(`/user?id=${user.id}`, user, {
          headers: { access_token: `Bearer ${user.access_token}` },
        });
        context?.handleSnackbar(res.data, "success");
        storeUser(user);
      } catch (err) {
        context?.handleSnackbar(
          err.res ? err.response.data : "Network error",
          "warning"
        );
      }
    }
  };
  // monthly borrow data for area chart
  const borrow_data = () => {
    let data = [];
    months?.map((month, index) => {
      let data_object = {
        title: month,
        total_advance: Number(
          loans
            ?.filter((loan) =>
              loan.createdAt.endsWith(
                (index + 1).toString().length === 0
                  ? `0${index + 1}/${new Date().getFullYear().toString()}`
                  : `${index + 1}/${new Date().getFullYear().toString()}`
              )
            )
            .reduce((a, b) => a + b.amount, 0)
            .toFixed(2)
        ),
      };
      data.push(data_object);
      return data_object;
    });
    return data;
  };
  const monthly_advance_data = borrow_data();
  return {
    openBorrowDialog,
    loanDetails,
    setLoanDetails,
    handleOpenBorrowDialog,
    borrowMoney,
    handleSettleDialog,
    showSettleDialog,
    settleDetails,
    setSettleDetails,
    settleAdvance,
    monthly_advance_data,
    type,
    toggleType,
    borrow,
    setBorrow,
    lend,
    setLend,
    lendMoney,
    settleType,
    toggleSettleType,
    settle,
    setSettle,
    getSettled,
    setGetSettled,
  };
};

export default useBorrow;
