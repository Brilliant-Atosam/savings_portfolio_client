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
            Is it important?
          </label>
          <select
            name=""
            className="login-input"
            id=""
            onChange={(e) =>
              setLoanDetails((prev) => ({
                ...prev,
                importance: e.target.value,
              }))
            }
            defaultValue={true}
          >
            <option value={true}>Yes</option>
            <option value={false}>false</option>
          </select>
          <label className="dialog-label" htmlFor="">
            Is it urgent?
          </label>
          <select
            name=""
            className="login-input"
            id=""
            onChange={(e) =>
              setLoanDetails((prev) => ({
                ...prev,
                importance: e.target.value,
              }))
            }
            defaultValue={true}
          >
            <option value={true}>Yes</option>
            <option value={false}>False</option>
          </select>
          <label className="dialog-label" htmlFor="">
            will you repay?
          </label>
          <select name="" className="login-input" id="">
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <label htmlFor="" className="dialog-label">
            Repayment date
          </label>

          <input
            type="date"
            disabled={!loanDetails.repay ? true : false}
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
