import "../styles/budget.css";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
// import Feedback from "../components/Feedback";
import { AddOutlined } from "@mui/icons-material";
import { CiCalendarDate } from "react-icons/ci";
import { FaCediSign } from "react-icons/fa6";
import Util from "../utils/util";
import useBudget from "../hooks/useBudget";
import Feedback from "../components/Feedback";
const Budget = () => {
  const {
    months,
    categories,
    user,
    businessExpenseCategories,
    format_currency,
  } = Util();
  const { newBudget, setNewBudget, createBudget, snackbar, handleSnackbar } =
    useBudget();
  const expensesCategories =
    user?.purpose !== "personal finance"
      ? businessExpenseCategories
      : categories;
  return (
    <div className="main-container">
      <Topbar />
      <div className="budget-container">
        <div className="budget-left">
          <div className="create-budget-container">
            <h1 className="debt-text">Create New Budget</h1>
            <div className="budget-input-container">
              <CiCalendarDate className="input-icon" />
              <select
                className="budget-input"
                onChange={(e) =>
                  setNewBudget((prev) => ({
                    ...prev,
                    month: Number(e.target.value),
                  }))
                }
                value={newBudget?.month}
              >
                <option>Select month</option>
                {months.map((month, index) => (
                  <option key={index} value={index}>
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
                          {
                            ...prev.categories.find(
                              (item) => item.category === cat.title
                            ),
                            amount: Number(e.target.value),
                          },
                          ...prev.categories.filter(
                            (item) => item.category !== cat.title
                          ),
                        ].sort((a, b) => (a.category < b.category ? -1 : 1)),
                        total_budget:
                          prev.categories
                            .filter((item) => item.category !== cat.title)
                            .reduce((a, b) => a + b.amount, 0) +
                          Number(e.target.value),
                      }))
                    }
                  />
                </div>
              ))}
            </div>
            <button className="login-btn" onClick={createBudget}>
              Create budget
            </button>
          </div>
        </div>
        <div className="budget-right">
          <div className="budgets-container">
            <h1 className="debt-text">My budgets</h1>
            <div className="my-budgets">
              <div className="my-budget">
                <div className="budget-info">
                  <CiCalendarDate /> <span>Lorem, ipsum.</span>
                </div>
                <div className="budget-info">
                  <FaCediSign /> <span>{format_currency(600)}</span>
                </div>
              </div>
              <div className="my-budget">budget</div>
              <div className="my-budget">budget</div>
              <div className="my-budget">budget</div>
            </div>
          </div>
        </div>
      </div>
      <div className="action-container">
        <div
          className="add-expenses-btn-container"
          //   onClick={toggleExpensesDialog}
        >
          <AddOutlined className="add-expenses-btn" />
        </div>
      </div>
      <Feedback
        snackbar={snackbar}
        toggler={() => handleSnackbar("", "info")}
      />
      <Footer />
    </div>
  );
};

export default Budget;
