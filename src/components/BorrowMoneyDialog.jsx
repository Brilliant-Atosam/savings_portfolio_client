import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React from "react";
import useBorrow from "../hooks/useBorrow";
import moment from "moment";
import useApp from "../useApp";
const BorrowMoneyDialog = ({
  open,
  borrowMoney,
  handleOpenBorrowDialog,
  lendMoney,
  setBorrow,
  setLend,
  lend,
  borrow,
}) => {
  const { type, toggleType, set_repayment_amount } = useBorrow();
  const { loading } = useApp();
  return (
    <Dialog open={open}>
      <DialogTitle>
        {type === "lend" ? "Lend money out" : "Borrow money"}
      </DialogTitle>
      <ToggleButtonGroup
        color="primary"
        value={type}
        exclusive
        onChange={(e) => toggleType(e.target.value)}
        aria-label="Platform"
      >
        <ToggleButton value="lend">Lend</ToggleButton>
        <ToggleButton value="borrow">Borrow</ToggleButton>
      </ToggleButtonGroup>
      <DialogContent>
        <div className="dialog-form-container">
          <label className="dialog-label" htmlFor="">
            {type === "lend"
              ? "How much are you lending out?"
              : "How much do you wish to borrow?"}
          </label>
          <input
            type="number"
            placeholder="Amount"
            className="login-input"
            onChange={(e) =>
              type === "lend"
                ? setLend((prev) => ({
                    ...prev,
                    amount: Number(e.target.value),
                  }))
                : setBorrow((prev) => ({
                    ...prev,
                    amount: Number(e.target.value),
                  }))
            }
          />
          <label className="dialog-label" htmlFor="">
            {type === "lend"
              ? "Who are you lending to?"
              : "Who are you borrowing from?"}
          </label>
          <input
            placeholder={type === "lend" ? "Borrower's name" : "Lender's name"}
            className="login-input"
            onChange={(e) =>
              type === "lend"
                ? setLend((prev) => ({
                    ...prev,
                    borrower: e.target.value,
                  }))
                : setBorrow((prev) => ({
                    ...prev,
                    lender: e.target.value,
                  }))
            }
            value={type === "lend" ? lend.borrower : borrow.lender}
          />
          <label className="dialog-label" htmlFor="">
            Reason:
          </label>
          <input
            type="text"
            placeholder="e.g. To take settle hospital bills"
            className="login-input"
            onChange={(e) =>
              type === "lend"
                ? setLend((prev) => ({
                    ...prev,
                    reason: e.target.value,
                  }))
                : setBorrow((prev) => ({
                    ...prev,
                    reason: e.target.value,
                  }))
            }
          />
          <label htmlFor="" className="dialog-label">
            {type === "lend"
              ? "When do you expect repayment?"
              : "When do you expect to repay?"}
          </label>
          <input
            type="date"
            className="login-input"
            onChange={(e) =>
              type === "lend"
                ? setLend((prev) => ({
                    ...prev,
                    repayment_date: moment(e.target.value).format("DD/MM/YYYY"),
                  }))
                : setBorrow((prev) => ({
                    ...prev,
                    repayment_date: moment(e.target.value).format("DD/MM/YYYY"),
                  }))
            }
          />
          <label className="dialog-label" htmlFor="">
            Type of interest:
          </label>
          <select
            name=""
            id=""
            className="login-input"
            onChange={(e) =>
              type === "lend"
                ? setLend((prev) => ({
                    ...prev,
                    interest_type: e.target.value,
                  }))
                : setBorrow((prev) => ({
                    ...prev,
                    interest_type: e.target.value,
                  }))
            }
          >
            <option value="">Select interest type</option>
            <option value="no interest">no interest</option>
            <option value="fixed interest">Fixed Interest (No Time)</option>
            <option value="simple interest">
              Simple interest (Time-Based)
            </option>
            <option value="lending rate">lending rate (Bank Standard)</option>
          </select>
          <label className="dialog-label" htmlFor="">
            Interest rate:
          </label>
          <input
            type="number"
            className="login-input"
            placeholder="Interest rate"
            onChange={(e) =>
              type === "lend"
                ? setLend((prev) => ({
                    ...prev,
                    interest_rate: e.target.value,
                    repayment_amount: set_repayment_amount(
                      prev?.interest_type,
                      e.target.value,
                      prev?.amount,
                      moment(prev.repayment_date).diff(moment(), "days")
                    ),
                  }))
                : setBorrow((prev) => ({
                    ...prev,
                    interest_rate: e.target.value,
                  }))
            }
          />

          <button
            disabled={loading}
            className="login-btn"
            onClick={() => {
              type === "lend" ? lendMoney() : borrowMoney(borrow);
            }}
          >
            {loading
              ? "loading..."
              : type === "lend"
              ? "Lend money"
              : "Borrow money"}
          </button>
          <button className="dialog-close-btn" onClick={handleOpenBorrowDialog}>
            Cancel
          </button>
        </div>
      </DialogContent>
      <div className="loading-container">
        {loading && <CircularProgress color="primary" />}
      </div>
    </Dialog>
  );
};

export default BorrowMoneyDialog;
