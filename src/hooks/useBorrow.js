import moment from "moment";
import { useState } from "react";
import request from "../utils/request";
import Util from "../utils/util";
import useApp from "../useApp";
import useSettings from "./useSettings";
import useFeedback from "./useFeedback";
const useBorrow = () => {
  const borrowedList =
    JSON.parse(window.localStorage.getItem("borrowed")) || [];
  const lentList = JSON.parse(window.localStorage.getItem("lent")) || [];
  const { storeLent, storeBorrowed, months, headers } = Util();
  const context = useApp();
  let user = JSON.parse(window.localStorage.getItem("user"));
  const { total_savings } = useSettings();
  const [openBorrowDialog, setOpenBorrowDialog] = useState(false);
  const { snackbar, handleSnackbar } = useFeedback();
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
  // repayments array
  let borrowed_repayment_history = [];
  borrowedList?.map((item) =>
    borrowed_repayment_history.push(...item?.repayment_history)
  );
  let lend_repayment_history = [];
  lentList?.map((item) =>
    lend_repayment_history.push(...item?.repayment_history)
  );
  const [getSettled, setGetSettled] = useState({
    settled_at: moment().format("DD/MM/YYYY"),
    amount: "",
    id: "",
  });

  const [borrow, setBorrow] = useState({
    user_id: user?.id,
    id: Math.floor(Math.random() * 9999).toString(),
    lender: "",
    amount: 0,
    reason: "",
    date: moment().format("DD/MM/YYYY"),
    repayment_date: "",
    interest_type: "",
    interest_rate: "",
    repayment_amount: 0,
    repayment_history: [],
  });
  const [lend, setLend] = useState({
    user_id: user?.id,
    id: Math.floor(Math.random() * 9999).toString(),
    borrower: "",
    amount: 0,
    reason: "",
    date: moment().format("DD/MM/YYYY"),
    repayment_date: "",
    interest_type: "",
    interest_rate: "",
    repayment_amount: 0,
    repayment_history: [],
  });
  // calculating repayment amount
  const set_repayment_amount = (interest_type, interest_rate, amount, days) => {
    switch (interest_type) {
      case "fixed rate":
        return ((100 + interest_rate) / 100) * amount;
      // break;
      case "simple interest":
        return (amount * interest_rate * (days / 365)) / 100;
      // break;
      case "lending rate":
        return amount + (1 + interest_rate / 100 / 12) ** (days / 365);
      // break;
      case "no interest":
        return amount;
      default:
        return amount;
    }
  };

  // settle debt
  const settleDebt = async (settle, handleExpenses) => {
    context?.handleLoader();
    if (
      !settle.amount ||
      !settle.id ||
      Number(settle.amount) +
        borrowedList
          ?.find((item) => item.id === settle.id)
          ?.repayment_history?.reduce((a, b) => a + Number(b.amount), 0) >
        Number(borrowedList?.find((item) => item.id === settle.id)?.amount)
    ) {
      handleSnackbar("Provide valid data for all fields", "warning");
    } else {
      const newExpenses = {
        userId: user?.id,
        item: `Settled debt owed to ${
          borrowedList?.find((item) => item.id === settle.id)?.lender
        }`,
        quantity: 1,
        unit_price: settle?.amount,
        total_cost: settle?.amount,
        category: "debt payment",
        created_at: settle?.settled_at,
        id: settle?.id,
      };
      try {
        const res = await request.put(`/loan/settle?id=${settle.id}`, settle, {
          headers,
        });
        let debt = borrowedList?.find((item) => item.id === settle.id);
        debt = {
          ...debt,
          repayment_history: [...debt?.repayment_history, settle],
        };
        const other_debts = borrowedList?.filter(
          (item) => item.id !== settle.id
        );
        await storeBorrowed([...other_debts, debt]);
        handleSnackbar(res.data, "success");
        await handleExpenses(newExpenses);
        setSettle({
          settled_at: moment().format("DD/MM/YYYY"),
          amount: "",
          id: "",
        });
      } catch (err) {
        handleSnackbar(
          err.response ? err.response.data : "Network Error!",
          "error"
        );
      }
    }
    context?.handleLoader();
  };
  // get settled debt
  const settledDebt = async (getSettled) => {
    context?.handleLoader();
    if (
      !getSettled?.amount ||
      !getSettled?.id ||
      Number(getSettled?.amount) >
        (lentList
          ?.find((item) => item.id === getSettled.id)
          ?.repayment_history?.reduce((a, b) => a + Number(b.amount), 0) ||
          lentList?.find((item) => item.id === getSettled.id).amount)
    ) {
      handleSnackbar("Provide valid data for all fields", "warning");
    } else {
      try {
        const res = await request.put(
          `/loan/settled?id=${getSettled?.id}`,
          getSettled,
          {
            headers,
          }
        );
        let debt = lentList?.find((item) => item.id === getSettled.id);
        debt = {
          ...debt,
          repayment_history: [...debt?.repayment_history, getSettled],
        };
        const other_debts = lentList?.filter(
          (item) => item.id !== getSettled.id
        );
        await storeLent([...other_debts, debt]);
        setGetSettled({
          settled_at: moment().format("DD/MM/YYYY"),
          amount: "",
          id: "",
        });
        handleSnackbar(res.data, "success");
      } catch (err) {
        handleSnackbar(
          err.response ? err.response.data : "Network Error!",
          "error"
        );
      }
    }
    context?.handleLoader();
  };
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
      handleSnackbar("Provide valid information for all fields.", "warning");
    } else if (lend.amount > total_savings) {
      handleSnackbar(
        "You cannot lend all or more than you have saved out",
        "warning"
      );
    } else {
      try {
        const res = await request.post("/loan/lend", lend, {
          headers,
        });
        storeLent([...lentList, lend]);
        handleSnackbar(res.data, "success");
      } catch (err) {
        handleSnackbar(
          err.response ? err.response.data : "Network Error!",
          "error"
        );
      }
    }
    context?.handleLoader();
  };
  // borrow money
  const borrowMoney = async (borrow) => {
    context?.handleLoader();
    if (
      !borrow.amount ||
      !borrow.lender ||
      !borrow.reason ||
      !borrow.repayment_date ||
      moment(borrow.repayment_date).isBefore(moment().format("DD/MM/YYYY"))
    ) {
      handleSnackbar("Provide valid information for all fields.", "warning");
    } else {
      try {
        const res = await request.post("/loan/borrow", borrow, {
          headers,
        });
        storeBorrowed([...borrowedList, borrow]);
        handleSnackbar(res.data, "success");
      } catch (err) {
        handleSnackbar(
          err.response ? err.response.data : "Network Error!",
          "error"
        );
      }
    }
    context?.handleLoader();
  };
  // delete borrowed debt
  const deleteBorrowedDebt = async (debt_id) => {
    context.handleLoader();
    const remaining_debts = borrowedList?.filter((debt) => debt.id !== debt_id);
    try {
      const res = await request.delete(`/loan/borrowed?debt_id=${debt_id}`);
      storeBorrowed(remaining_debts);
      window.alert(res.data);
    } catch (err) {
      window.alert(
        err.response ? err.response.data : err.message || "Network error!"
      );
    }
    context.handleLoader();
  };
  // delete lent debt
  const deleteLentDebt = async (debt_id) => {
    context.handleLoader();
    const remaining_debts = lentList?.filter((debt) => debt.id !== debt_id);
    try {
      const res = await request.delete(`/loan/lent?debt_id=${debt_id}`, {
        headers,
      });
      storeLent(remaining_debts);
      window.alert(res.data);
    } catch (err) {
      window.alert(
        err.response ? err.response.data : err.message || "Network error!"
      );
    }
    context.handleLoader();
  };

  const [showSettleDialog, setShowSettleDialog] = useState(false);
  const handleSettleDialog = () => setShowSettleDialog((prev) => !prev);

  // monthly borrow data for area chart
  const borrow_data = () => {
    let data = [];
    months?.map((month, index) => {
      let data_object = {
        title: month,
        debt: Number(
          borrowedList
            ?.filter((borrow) =>
              borrow.date.endsWith(
                (index + 1).toString().length === 0
                  ? `0${index + 1}/${new Date().getFullYear().toString()}`
                  : `${index + 1}/${new Date().getFullYear().toString()}`
              )
            )
            .reduce((a, b) => a + Number(b.amount), 0)
            .toFixed(2)
        ),
        settlement: Number(
          borrowed_repayment_history
            ?.filter((item) =>
              item.settled_at.endsWith(
                (index + 1).toString().length === 0
                  ? `0${index + 1}/${new Date().getFullYear().toString()}`
                  : `${index + 1}/${new Date().getFullYear().toString()}`
              )
            )
            .reduce((a, b) => a + Number(b.amount), 0)
            .toFixed(2)
        ),
      };
      data.push(data_object);
      return data_object;
    });
    return data;
  };
  // monthly lend data
  const lend_data = () => {
    let data = [];
    months?.map((month, index) => {
      let data_object = {
        title: month,
        debt: Number(
          lentList
            ?.filter((lend) =>
              lend.date.endsWith(
                (index + 1).toString().length === 0
                  ? `0${index + 1}/${new Date().getFullYear().toString()}`
                  : `${index + 1}/${new Date().getFullYear().toString()}`
              )
            )
            .reduce((a, b) => a + Number(b.amount), 0)
            .toFixed(2)
        ),
        settlement: Number(
          lend_repayment_history
            ?.filter((item) =>
              item.settled_at.endsWith(
                (index + 1).toString().length === 0
                  ? `0${index + 1}/${new Date().getFullYear().toString()}`
                  : `${index + 1}/${new Date().getFullYear().toString()}`
              )
            )
            .reduce((a, b) => a + Number(b.amount), 0)
            .toFixed(2)
        ),
      };
      data.push(data_object);
      return data_object;
    });
    return data;
  };
  const monthly_lent_data = lend_data();
  const monthly_borrow_data = borrow_data();
  return {
    openBorrowDialog,
    handleOpenBorrowDialog,
    borrowMoney,
    handleSettleDialog,
    showSettleDialog,
    monthly_lent_data,
    monthly_borrow_data,
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
    settleDebt,
    settledDebt,
    borrowedList,
    borrowed_repayment_history,
    lend_repayment_history,
    lentList,
    lend_data,
    snackbar,
    handleSnackbar,
    deleteBorrowedDebt,
    deleteLentDebt,
    set_repayment_amount,
  };
};

export default useBorrow;
