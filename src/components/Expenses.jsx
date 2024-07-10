import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import Util from "../utils/util";
import useApp from "../useApp";
import useExpenses from "../hooks/useExpenses";
import moment from "moment";
import Feedback from "./Feedback";

const ExpensesDialog = ({ open, toggle }) => {
  const { categories } = Util();
  const { loading } = useApp();
  const { expenses, setExpenses, handleExpenses, handleSnackbar, snackbar } =
    useExpenses();
  return (
    <>
      <Dialog open={open}>
        <DialogTitle className="login-text">New expenses</DialogTitle>
        <DialogContent>
          <div className="dialog-form-container">
            <label className="dialog-label" htmlFor="">
              Item name/title:
            </label>
            <input
              type="text"
              placeholder="What did you buy or spend on?"
              className="login-input"
              onChange={(e) =>
                setExpenses((prev) => ({ ...prev, item: e.target.value }))
              }
              value={expenses.item}
            />
            <label className="dialog-label" htmlFor="">
              Category:
            </label>
            <select
              name=""
              id=""
              className="login-input"
              onChange={(e) =>
                setExpenses((prev) => ({ ...prev, category: e.target.value }))
              }
              value={expenses.category}
            >
              <option value="">select category</option>
              {categories.map((cat, index) => (
                <option
                  className="select-options"
                  key={index}
                  value={cat.title}
                >
                  {cat.title}
                </option>
              ))}
            </select>
            <label className="dialog-label" htmlFor="">
              Quantity:
            </label>
            <input
              type="number"
              placeholder="How many units did you buy?"
              className="login-input"
              onChange={(e) =>
                setExpenses((prev) => ({
                  ...prev,
                  quantity: Number(e.target.value),
                }))
              }
              value={expenses.quantity}
            />
            <label className="dialog-label" htmlFor="">
              Price per unit:
            </label>
            <input
              type="number"
              placeholder="How much does a unit cost"
              className="login-input"
              onChange={(e) =>
                setExpenses((prev) => ({
                  ...prev,
                  unit_price: Number(e.target.value),
                  total_cost: e.target.value * prev.quantity,
                }))
              }
              value={expenses.unit_price}
              max={new Date().toLocaleDateString()}
            />
            <label className="dialog-label" htmlFor="">
              Total cost:
            </label>
            <input
              type="number"
              placeholder="How much does a unit cost"
              className="login-input"
              value={expenses.total_cost}
              readOnly
            />

            <label className="dialog-label" htmlFor="">
              Date:
            </label>
            <input
              type="date"
              placeholder="How much does a unit cost"
              className="login-input"
              onChange={(e) =>
                setExpenses((prev) => ({
                  ...prev,
                  created_at: moment(e.target.value).format("DD/MM/YYYY"),
                }))
              }
            />
            <button
              className="login-btn"
              disabled={loading}
              onClick={handleExpenses}
            >
              {loading ? "loading" : "Create new expenses"}
            </button>
            <button className="dialog-close-btn" onClick={toggle}>
              Cancel
            </button>
          </div>
        </DialogContent>
        <div className="loading-container">
          {loading && <CircularProgress color="primary" />}
        </div>
      </Dialog>
      <Feedback
        snackbar={snackbar}
        toggler={() => handleSnackbar("", "info")}
      />
    </>
  );
};

export default ExpensesDialog;
