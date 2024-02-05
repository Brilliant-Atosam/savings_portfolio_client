import moment from "moment";
import { useState } from "react";
import useApp from "../useApp";
import request from "../utils/request";
import Util from "../utils/util";
import { useLocation } from "react-router-dom";

const useExpenses = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("index");
  const context = useApp();
  const { storeUser, storeExpenses, categories, months } = Util();
  let user = JSON.parse(localStorage.getItem("user"));
  let expensesList = query
    ? JSON.parse(localStorage.getItem("expenses")).filter(
        (expense) => expense.category === categories[query]
      )
    : JSON.parse(localStorage.getItem("expenses"));
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);
  const toggleExpensesDialog = () => setOpenExpenseDialog(!openExpenseDialog);
  const [expenses, setExpenses] = useState({
    userId: user.id,
    item: "",
    quantity: "",
    unit_price: "",
    total_cost: 0,
    category: "",
    created_at: moment(new Date()).format("DD/MM/YYYY"),
    id: Math.floor(Math.random() * 9999).toString(),
  });
  const handleExpenses = async () => {
    context?.handleLoader();
    if (
      !expenses.item ||
      expenses.quantity < 1 ||
      expenses.unit_price < 0.1 ||
      !expenses.category
    ) {
      context?.handleSnackbar("Provide valid inputs", "warning");
    } else {
      try {
        const res = await request.post("/expenses", expenses, {
          headers: {
            access_token: `Bearer ${user.access_token}`,
          },
        });
        context?.handleSnackbar(res.data, "success");
        user = {
          ...user,
          total_expenses: user.total_expenses + expenses.total_cost,
        };
        storeExpenses([expenses, ...expensesList]);
        storeUser(user);
        setExpenses({
          userId: user.id,
          item: "",
          quantity: "",
          unit_price: "",
          total_cost: 0,
          category: "",
          created_at: moment(new Date()).format("DD/MM/YYYY"),
          id: Math.floor(Math.random() * 9999).toString(),
        });
        toggleExpensesDialog();
      } catch (err) {
        context?.handleSnackbar(
          err.response ? err.response.data : err.message,
          "error"
        );
      }
    }
    context?.handleLoader();
  };
  const deleteExpenses = async (id) => {
    context?.handleLoader();
    expensesList = expensesList.filter((item) => item.id !== id);
    try {
      const res = await request.delete(`/expenses?id=${id}`, {
        headers: {
          access_token: `Bearer ${user.access_token}`,
        },
      });
      storeExpenses(expensesList);
      context?.handleSnackbar(res.data, "success");
    } catch (err) {
      context?.handleSnackbar(
        err.response ? err.response.data : err.message,
        "error"
      );
    }
    context?.handleLoader();
  };
  const chart_data = () => {
    let data = [];
    categories.map((category) => {
      let data_object = {
        title: category,
        total_amount: expensesList
          .filter((item) => item.category === category)
          .reduce((a, b) => a + b.total_cost, 0),
      };
      data.push(data_object);
      return data_object;
    });
    return data;
  };
  let data = chart_data();
  // monthly expenses chart
  const monthly_expenses = () => {
    let data = [];
    months?.map((month, index) => {
      let data_object = {
        title: month,
        total_amount: expensesList
          ?.filter((expenses) =>
            expenses?.created_at?.endsWith(
              (index + 1).toString().length === 1
                ? `0${index + 1}/${new Date().getFullYear().toString()}`
                : `${index + 1}/${new Date().getFullYear().toString()}`
            )
          )
          .reduce((a, b) => a + b.total_cost, 0),
      };
      data.push(data_object);
      return data_object;
    });
    return data;
  };
  const monthly_expenses_data = monthly_expenses();
  return {
    toggleExpensesDialog,
    openExpenseDialog,
    expenses,
    setExpenses,
    handleExpenses,
    expensesList,
    data,
    monthly_expenses_data,
    query,
    deleteExpenses,
  };
};

export default useExpenses;
