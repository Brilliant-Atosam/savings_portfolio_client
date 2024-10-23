// import { months } from "moment";
import { useState } from "react";
// import Util from "../utils/util";
import useExpenses from "./useExpenses";

const useBudget = () => {
  const { expensesCategories } = useExpenses();
  const [newBudget, setNewBudget] = useState({
    month: "",
    estimated_budget: 0,
    total_budget: 0,
    categories: expensesCategories.map((cat) => ({
      category: cat.title,
      amount: 0,
    })),
    balance: 0,
  });
  // function to be calculating total budget
  
  console.log(newBudget);

  return { newBudget, setNewBudget };
};

export default useBudget;
