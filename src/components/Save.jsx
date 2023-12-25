import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import useApp from "../useApp";
import React, { useEffect } from "react";
import "../styles/login.css";
import useSave from "../hooks/useSave";
const Save = ({ open, handleSaveDialog, handleSave }) => {
  const { user, loading } = useApp();

  const { savings, setSavings } = useSave();
  useEffect(() => {
    const updatedDetail = user?.portfolio.map((item) => ({
      title: item.title,
      amount: parseFloat(((item.percentage / 100) * savings.amount).toFixed(2)),
    }));
    setSavings((prev) => ({ ...prev, details: updatedDetail }));
  }, [savings.amount, user?.portfolio, setSavings]);
  return (
    <Dialog open={open}>
      <DialogTitle className="login-text">Save money</DialogTitle>
      {user.portfolio.length < 1 && (
        <DialogTitle className="login-text red">
          You cannot save without a portfolio. Create one before you continue
        </DialogTitle>
      )}
      <DialogContent>
        <div className="dialog-form-container">
          <label className="dialog-label" htmlFor="">
            Source:
          </label>
          <input
            type="text"
            placeholder="Where did you get the money?"
            className="login-input"
            onChange={(e) =>
              setSavings((prev) => ({
                ...prev,
                source: e.target.value,
              }))
            }
            value={savings?.source}
          />
          <label className="dialog-label" htmlFor="">
            Income:
          </label>
          <input
            type="number"
            placeholder="How much did you earn?"
            className="login-input"
            onChange={(e) =>
              setSavings((prev) => ({
                ...prev,
                amount: parseInt(e.target.value),
              }))
            }
            value={savings?.amount}
          />
          {user && (
            <div className="portfolio-container">
              {user?.portfolio.map((item, index) => (
                <div className="portfolio" key={index}>
                  <span className="portfolio-title">{`${item?.title} (${item?.percentage}%)`}</span>
                  <span className="portfolio-value">
                    {(item?.percentage * savings.amount) / 100}
                  </span>
                </div>
              ))}
            </div>
          )}
          <button
            className="login-btn"
            disabled={loading}
            onClick={() =>
              handleSave({
                ...savings,
                userId: user.id,
                balance: parseFloat(
                  savings.amount -
                    savings.details.reduce((total, currentValue) => {
                      return total + currentValue.amount;
                    }, 0)
                ),
                saved: parseFloat(
                  savings.details.reduce((total, currentValue) => {
                    return total + currentValue.amount;
                  }, 0)
                ),
              })
            }
          >
            {loading ? "loading..." : "Save now"}
          </button>
          <button className="dialog-close-btn" onClick={handleSaveDialog}>
            Close
          </button>
        </div>
      </DialogContent>
      <div className="loading-container">
        {loading && <CircularProgress color="primary" />}
      </div>
    </Dialog>
  );
};

export default Save;
