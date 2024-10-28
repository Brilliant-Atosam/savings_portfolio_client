// import { months } from "moment";
import { useState } from "react";
// import Util from "../utils/util";
import useExpenses from "./useExpenses";
import request from "../utils/request";
import useFeedback from "./useFeedback";
import useApp from "../useApp";
import Util from "../utils/util";
import moment from "moment";

const useBudget = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let budgets = JSON.parse(window.localStorage.getItem("budgets")) || [];
  const context = useApp();
  console.log(budgets);
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
  };
};

export default useBudget;
