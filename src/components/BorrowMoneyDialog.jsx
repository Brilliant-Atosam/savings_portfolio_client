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
}) => {
  const { type, toggleType, setBorrow, setLend, lend, borrow } = useBorrow();
  const { loading } = useApp();
  return (
    <Dialog open={open}>
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
      <DialogTitle>
        {type === "lend" ? "Lend money out" : "Borrow money"}
      </DialogTitle>
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
