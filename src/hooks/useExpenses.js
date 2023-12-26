import moment from "moment";
import { useState } from "react";
import useApp from "../useApp";
import request from "../utils/request";
import Util from "../utils/util";

const useExpenses = () => {
  const context = useApp();
  const { storeUser, storeExpenses } = Util();
  let user = JSON.parse(localStorage.getItem("user"));
  let expensesList = JSON.parse(localStorage.getItem("expenses"));
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
      } catch (err) {
        context?.handleSnackbar(
          err.response ? err.response.data : err.message,
          "error"
        );
      }
    }
    context?.handleLoader();
  };
  return {
    toggleExpensesDialog,
    openExpenseDialog,
    expenses,
    setExpenses,
    handleExpenses,
    expensesList,
  };
};

export default useExpenses;
