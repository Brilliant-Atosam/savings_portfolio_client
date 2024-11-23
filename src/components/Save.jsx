import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import useApp from "../useApp";
import React, { useEffect } from "react";
// import Subscription from "./Subscription";
import "../styles/login.css";
import useSave from "../hooks/useSave";
import Util from "../utils/util";
import moment from "moment";
const Save = ({ open, handleSaveDialog, handleSave }) => {
  const { user, loading } = useApp();
  const { sources_of_income, colors, businessIncomeSources } = Util();
  const income_source =
    user?.purpose === "personal finance"
      ? sources_of_income
      : businessIncomeSources;

  const { savings, setSavings, spendable_percentage } = useSave();
  useEffect(() => {
    const updatedDetail = user?.portfolio
      ?.filter((item) => !item.archived)
      ?.map((item) => ({
        title: item.title,
        amount: parseFloat(
          ((item.percentage / 100) * savings.amount).toFixed(2)
        ),
      }));
    setSavings((prev) => ({ ...prev, details: updatedDetail }));
  }, [savings.amount, user?.portfolio, setSavings]);
  return (
    <Dialog open={open}>
      <DialogTitle className="login-text">Add income dialog</DialogTitle>
      {user.portfolio?.length < 1 && (
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
            <option value="">Choose source of income</option>
            {income_source.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
          <label className="dialog-label" htmlFor="">
            Amount:
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
          <label className="dialog-label" htmlFor="">
            Date: <span className="date">{savings?.createdAt}</span>
          </label>
          <input
            type="date"
            className="login-input"
            onChange={(e) =>
              setSavings((prev) => ({
                ...prev,
                createdAt: moment(e.target.value).format("DD/MM/YYYY"),
              }))
            }
            value={savings?.createdAt}
          />
          {user && (
            <div className="portfolio-container">
              <div className="portfolio">
                <span className="portfolio-title">
                  Spendable amount ({spendable_percentage}%)
                </span>
                <span className="portfolio-value">
                  {Number(
                    ((spendable_percentage * savings.amount) / 100).toFixed(2)
                  )}
                </span>
              </div>
              {user?.portfolio
                ?.filter((item) => !item.archived)
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
                      {Number(
                        ((item?.percentage * savings.amount) / 100).toFixed(2)
                      )}
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
          {/* {user?.tier !== "premium" && <Subscription />} */}
        </div>
      </DialogContent>
      <div className="loading-container">
        {loading && <CircularProgress color="primary" />}
      </div>
    </Dialog>
  );
};

export default Save;
