import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaCediSign } from "react-icons/fa6";

const BudgetForm = ({
  setNewBudget,
  months,
  newBudget,
  expensesCategories,
  createBudget,
  showCatAmount,
  title,
  button_text,
}) => {
  return (
    <div className="create-budget-container">
      <h1 className="debt-text">{title}</h1>
      <div className="budget-input-container">
        <CiCalendarDate className="input-icon" />
        <select
          className="budget-input"
          onChange={(e) =>
            setNewBudget((prev) => ({
              ...prev,
              month:
                new Date().getMonth() > 0 && Number(e.target.value) === 0
                  ? `${e.target.value}/${new Date().getFullYear() + 1}`
                  : `${e.target.value}/${new Date().getFullYear()}`,
            }))
          }
          value={months[Number(newBudget?.month.split("/")[0]) - 1]}
          disabled={showCatAmount}
        >
          {newBudget.month && (
            <option>
              {months[Number(newBudget?.month.split("/")[0]) - 1]}
            </option>
          )}
          <option>Select month</option>
          {months.map((month, index) => (
            <option
              key={index}
              value={
                (index + 1).toString().length === 1
                  ? `0${index + 1}`
                  : `${index + 1}`
              }
            >
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="budget-input-container">
        <FaCediSign className="input-icon" />
        <input
          placeholder="Estimated Budget"
          className="budget-input"
          onChange={(e) =>
            setNewBudget({
              ...newBudget,
              estimated_budget: Number(e.target.value),
              balance: Number(e.target.value),
            })
          }
          value={newBudget?.estimated_budget}
        />
      </div>
      <div className="budget-categories">
        {expensesCategories.map((cat, index) => (
          <div className="budget-input-container" key={index}>
            <p className="budget-category">{cat.title}</p>
            <input
              placeholder="amount"
              className="budget-input"
              onChange={(e) =>
                setNewBudget((prev) => ({
                  ...prev,
                  categories: [
                    ...prev.categories.filter(
                      (item) => item.category !== cat.title
                    ),
                    {
                      category: cat.title,
                      amount: Number(e.target.value),
                    },
                    // {
                    //   ...prev.categories.find(
                    //     (item) => item.category === cat.title
                    //   ),
                    //   amount: Number(e.target.value),
                    // },
                    // ...prev.categories.filter(
                    //   (item) => item.category !== cat.title
                    // ),
                  ].sort((a, b) => (a.category < b.category ? -1 : 1)),
                  total_budget:
                    prev.categories
                      .filter((item) => item.category !== cat.title)
                      .reduce((a, b) => a + b.amount, 0) +
                    Number(e.target.value),
                }))
              }
              value={showCatAmount && newBudget?.categories[index]?.amount}
            />
          </div>
        ))}
      </div>
      <button className="login-btn" onClick={createBudget}>
        {button_text}
      </button>
    </div>
  );
};
export default BudgetForm;
