import moment from "moment";
import { useState } from "react";
import request from "../utils/request";
import Util from "../utils/util";
import useApp from "../useApp";
const useBorrow = () => {
  const { storeUser, storeLoan } = Util();
  const context = useApp();
  let user = JSON.parse(window.localStorage.getItem("user"));
  let loans = JSON.parse(window.localStorage.getItem("loans"));
  const [openBorrowDialog, setOpenBorrowDialog] = useState(false);
  const [loanDetails, setLoanDetails] = useState({
    amount: "",
    reason: "",
    urgency: true,
    importance: true,
    repay: true,
    repayment_date: "",
    createdAt: moment(new Date()).format("DD/MM/YYYY"),
    id: Math.floor(Math.random() * 9999).toString(),
    userId: user?.id,
  });
  const handleOpenBorrowDialog = () => {
    setOpenBorrowDialog((prev) => !prev);
  };

  const borrowMoney = async (loanDetails) => {
    if (loanDetails.amount > user.total_amount_saved) {
      context?.handleSnackbar(
        "You cannot borrow more than you have saved!",
        "warning"
      );
    } else if (
      !loanDetails.amount ||
      !loanDetails.reason ||
      !loanDetails.urgency ||
      !loanDetails.importance
    ) {
      context?.handleSnackbar("Provide value for all fields", "warning");
    } else if (loanDetails.amount > user.total_amount_saved) {
      context?.handleSnackbar(
        "You cannot take more than you have saved!",
        "warning"
      );
    } else {
      user = {
        ...user,
        total_advance: user.total_advance + loanDetails.amount,
        amount_owed: user.total_advance + loanDetails.amount,
      };
      loans = { ...loans, loanDetails };
      try {
        const res = await request.post(
          `/loan?userId=${user.id}`,
          { loanDetails, user },
          {
            headers: {
              access_token: `Bearer ${user.access_token}`,
            },
          }
        );
        context?.handleSnackbar(res.data, "success");
        storeUser(user);
        storeLoan(loans);
      } catch (err) {
        context?.handleSnackbar(
          err.response ? err.response.data : "Network Error!",
          "error"
        );
      }
    }
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
  };
};

export default useBorrow;
