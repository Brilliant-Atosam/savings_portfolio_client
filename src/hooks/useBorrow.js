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
  const { storeLent, storeBorrowed, months } = Util();
  const context = useApp();
  let user = JSON.parse(window.localStorage.getItem("user"));
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
  // repayments array
  let borrowed_repayment_history = [];
  borrowedList?.map((item) =>
    borrowed_repayment_history.push(...item?.repayment_history)
  );
  let lend_repayment_history = [];
  lentList?.map((item) =>
    lend_repayment_history.push(...item?.repayment_history)
  );
  // console.log(lend_repayment_history);
  const [getSettled, setGetSettled] = useState({
    settled_at: moment().format("DD/MM/YYYY"),
    amount: "",
    id: "",
  });
  const [borrowDetails, setBorrowDetails] = useState({});
  const setBorrowDetailsFunc = (data) => setBorrowDetails((prev) => data);
  const [toggleBorrowDetails, setToggleBorrowDetails] = useState(false);
  console.log(borrowDetails);
  console.log(toggleBorrowDetails);
  const borrowDetailsToggler = () => setToggleBorrowDetails((prev) => !prev);
  const [borrow, setBorrow] = useState({
    user_id: user?.id,
    id: Math.floor(Math.random() * 9999).toString(),
    lender: "",
    amount: 0,
    reason: "",
    date: moment().format("DD/MM/YYYY"),
    repayment_date: "",
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
    repayment_history: [],
  });
  // settle debt
  const settleDebt = async (settle) => {
    context?.handleLoader();
    if (
      !settle.amount ||
      !settle.id ||
      Number(settle.amount) >
        (borrowedList
          ?.find((item) => item.id === settle.id)
          ?.repayment_history?.reduce((a, b) => a + b.amount, 0) ||
          borrowedList?.find((item) => item.id === settle.id).amount)
    ) {
      context?.handleSnackbar("Provide valid data for all fields", "warning");
    } else {
      try {
        const res = await request.put(`/loan/settle?id=${settle.id}`, settle, {
          headers: {
            access_token: `Bearer ${user.access_token}`,
          },
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
  // get settled debt
  const settledDebt = async (getSettled) => {
    context?.handleLoader();
    if (
      !getSettled?.amount ||
      !getSettled?.id ||
      Number(getSettled?.amount) >
        (lentList
          ?.find((item) => item.id === getSettled.id)
          ?.repayment_history?.reduce((a, b) => a + b.amount, 0) ||
          lentList?.find((item) => item.id === getSettled.id).amount)
    ) {
      context?.handleSnackbar("Provide valid data for all fields", "warning");
    } else {
      try {
        const res = await request.put(
          `/loan/settled?id=${getSettled?.id}`,
          getSettled,
          {
            headers: {
              access_token: `Bearer ${user.access_token}`,
            },
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
            .reduce((a, b) => a + b.amount, 0)
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
            .reduce((a, b) => a + b.amount, 0)
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
    setBorrowDetailsFunc,
    borrowDetails,
    borrowDetailsToggler,
    toggleBorrowDetails,
  };
};

export default useBorrow;
