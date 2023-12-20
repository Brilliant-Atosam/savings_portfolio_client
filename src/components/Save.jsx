import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import useApp from "../useApp";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "../styles/login.css";
const Save = ({ open, handleSaveDialog, handleSave }) => {
  const { user } = useApp();
  let details = [];
  const [savings, setSavings] = useState({
    source: "",
    amount: "",
    createdAt: moment(new Date()).format("DD/MM/YYYY"),
    id: Math.floor(Math.random() * 9999).toFixed(),
    userId: user?.id,
    details,
  });
  useEffect(() => {
    const updatedDetail = user?.portfolio.map((item) => ({
      title: item.title,
      amount: parseFloat(((item.percentage / 100) * savings.amount).toFixed(2)),
    }));
    setSavings((prev) => ({ ...prev, details: updatedDetail }));
  }, [savings.amount, user?.portfolio]);
  return (
    <Dialog open={open}>
      <DialogTitle className="login-text">Save money</DialogTitle>
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
            Save now
          </button>
          <button className="dialog-close-btn" onClick={handleSaveDialog}>
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Save;
