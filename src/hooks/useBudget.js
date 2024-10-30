// import { months } from "moment";
import { useState } from "react";
// import Util from "../utils/util";
import useExpenses from "./useExpenses";
import request from "../utils/request";
import useFeedback from "./useFeedback";
import useApp from "../useApp";
import Util from "../utils/util";
import moment from "moment";
import { useLocation } from "react-router-dom";

const useBudget = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let budgets = JSON.parse(window.localStorage.getItem("budgets")) || [];
  const { expensesList } = useExpenses();
  const context = useApp();
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const budget_id = param.get("budget_id");
  const budget_details = budgets.find((budget) => budget.id === budget_id);
  const expenses_within_budget_period = expensesList.filter((item) =>
    item.created_at.endsWith(budget_details?.month)
  );
  console.log(expenses_within_budget_period);

  const { storeBudget } = Util();
  const { handleSnackbar, snackbar } = useFeedback();
  const { expensesCategories } = useExpenses();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const moreOptionsToggler = () => setShowMoreOptions((prev) => !prev);
  const [newBudget, setNewBudget] = useState({
    month: "",
    estimated_budget: "",
    total_budget: "",
    categories: expensesCategories.map((cat) => ({
      category: cat.title,
      amount: 0,
    })),
    balance: 0,
    id: Math.floor(Math.random() * 99999).toString(),
    created_at: moment().format("DD/MM/YYYY"),
    userId: user.id,
  });
  // function create new budget
  const createBudget = async () => {
    context?.handleLoader();
    if (newBudget.total_budget < 1 || newBudget.month === "") {
      handleSnackbar("provide value for required fields", "warning");
    } else if (budgets.find((budget) => budget.month === newBudget.month)) {
      handleSnackbar("There is an existing budget for this month", "warning");
    } else {
      try {
        const res = await request.post(
          "/budget",
          {
            ...newBudget,
            categories: newBudget.categories.filter((cat) => cat.amount > 0),
          },
          {
            headers: {
              access_token: `Bearer ${user.access_token}`,
            },
          }
        );
        storeBudget([
          {
            ...newBudget,
            categories: newBudget.categories.filter((cat) => cat.amount > 0),
          },
          ...budgets,
        ]);
        handleSnackbar(res.data, "success");
        setNewBudget({
          month: "",
          estimated_budget: "",
          total_budget: "",
          categories: expensesCategories.map((cat) => ({
            category: cat.title,
            amount: "",
          })),
          balance: 0,
          id: Math.floor(Math.random() * 99999).toString(),
          created_at: moment().format("DD/MM/YYYY"),
          userId: user.id,
        });
      } catch (err) {
        handleSnackbar(err.response ? err.response.data : err.message, "error");
      }
    }
    context?.handleLoader();
  };

  //  delete budget
  const deleteBudget = async (id) => {
    context?.handleLoader();
    try {
      const res = await request.delete(
        `/budget?userId=${user.id}&budgetId=${id}`,
        {
          headers: {
            access_token: `Bearer ${user?.access_token}`,
          },
        }
      );
      handleSnackbar(res.data, "success");
      storeBudget(budgets.filter((budget) => budget.id !== id));
    } catch (err) {
      handleSnackbar(err.response ? err.response.data : err.message, "error");
    }
    context?.handleLoader();
  };

  return {
    newBudget,
    setNewBudget,
    createBudget,
    snackbar,
    handleSnackbar,
    budgets,
    showMoreOptions,
    moreOptionsToggler,
    deleteBudget,
    budget_details,
    expenses_within_budget_period,
  };
};

export default useBudget;