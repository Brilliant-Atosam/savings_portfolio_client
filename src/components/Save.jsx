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
import Util from "../utils/util";
const Save = ({ open, handleSaveDialog, handleSave }) => {
  const { user, loading } = useApp();
  const { sources_of_income, colors } = Util();
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
      <DialogTitle className="login-text">Add income dialog</DialogTitle>
      {user.portfolio.length < 1 && (
        <DialogTitle className="login-text red">
          You cannot save without a portfolio. Create one now!
        </DialogTitle>
      )}
      <DialogContent>
        <div className="dialog-form-container">
          <label className="dialog-label" htmlFor="">
            Where did the money come from?:
          </label>
          <select
            type="text"
            placeholder=""
            className="login-input"
            onChange={(e) =>
              setSavings((prev) => ({
                ...prev,
                source: e.target.value,
              }))
            }
            value={savings?.source}
          >
            {sources_of_income.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
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
                amount: Number(e.target.value),
              }))
            }
            // value={savings?.amount}
          />
          {user && (
            <div className="portfolio-container">
              {user?.portfolio
                .filter((item) => !item.archived)
                .map((item, index) => (
                  <div className="portfolio" key={index}>
                    <span
                      className="portfolio-title"
                      style={{ color: colors[index] }}
                    >{`${item?.title} (${item?.percentage}%)`}</span>
                    <span
                      className="portfolio-value"
                      style={{ color: colors[index] }}
                    >
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
