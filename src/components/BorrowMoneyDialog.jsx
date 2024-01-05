import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import useBorrow from "../hooks/useBorrow";
import moment from "moment";
import useApp from "../useApp";
const BorrowMoneyDialog = ({ open, borrowMoney, handleOpenBorrowDialog }) => {
  const { setLoanDetails, loanDetails } = useBorrow();
  const { loading, user } = useApp();
  return (
    <Dialog open={open}>
      <DialogTitle>Take advance from your savings</DialogTitle>
      {Number(user.total_amount_saved) < 1 && (
        <DialogTitle className="red">
          You do not have any money saved.
        </DialogTitle>
      )}
      <DialogContent>
        <div className="dialog-form-container">
          <label className="dialog-label" htmlFor="">
            How much do you wish to borrow?
          </label>
          <input
            type="number"
            placeholder="Amount"
            className="login-input"
            onChange={(e) =>
              setLoanDetails((prev) => ({
                ...prev,
                amount: Number(e.target.value),
              }))
            }
          />
          <label className="dialog-label" htmlFor="">
            Reason for taking this advance:
          </label>
          <input
            type="text"
            placeholder="To take settle hospital bills"
            className="login-input"
            onChange={(e) =>
              setLoanDetails((prev) => ({
                ...prev,
                reason: e.target.value,
              }))
            }
          />
          <label className="dialog-label" htmlFor="">
            Where do you want to borrow from?
          </label>
          <select
            name=""
            className="login-input"
            onChange={(e) =>
              setLoanDetails((prev) => ({
                ...prev,
                borrowed_from: e.target.value,
              }))
            }
            defaultValue={true}
          >
            <option value="">Select source</option>
            <option value="external source">External source</option>
            {user.portfolio.map((item) => (
              <option value={item.title} key={item.id}>
                {item.title}
              </option>
            ))}
          </select>
          <label htmlFor="" className="dialog-label">
            When will you fully repay the advance?
          </label>

          <input
            type="date"
            className="login-input"
            onChange={(e) =>
              setLoanDetails((prev) => ({
                ...prev,
                repayment_date: moment(e.target.value).format("DD/MM/YYYY"),
              }))
            }
            defaultValue={true}
          />
          <button
            disabled={loading}
            className="login-btn"
            onClick={() => borrowMoney(loanDetails)}
          >
            {loading ? "loading..." : "Borrow money"}
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
