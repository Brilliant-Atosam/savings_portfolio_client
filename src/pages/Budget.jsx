import "../styles/budget.css";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import {
  Balance,
  Category,
  DeleteOutlineOutlined,
  ModeEditOutlined,
  MoreVert,
  VisibilityOutlined,
} from "@mui/icons-material";
import { GiPayMoney } from "react-icons/gi";
import { GrPieChart } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";
import { FaCediSign } from "react-icons/fa6";
import Util from "../utils/util";
import useBudget from "../hooks/useBudget";
import Feedback from "../components/Feedback";
import useExpenses from "../hooks/useExpenses";
import BudgetForm from "../components/BudgetForm";
// import { Link } from "react-router-dom";
const Budget = () => {
  const {
    months,
    categories,
    user,
    businessExpenseCategories,
    format_currency,
  } = Util();
  const {
    newBudget,
    setNewBudget,
    createBudget,
    snackbar,
    handleSnackbar,
    budgets,
    showMoreOptions,
    moreOptionsToggler,
    deleteBudget,
  } = useBudget();
  const { expensesList } = useExpenses();

  const expensesCategories =
    user?.purpose !== "personal finance"
      ? businessExpenseCategories
      : categories;
  return (
    <div className="main-container">
      <Topbar />
      <div className="budget-container">
        <div className="budget-left">
          <BudgetForm
            createBudget={createBudget}
            expensesCategories={expensesCategories}
            months={months}
            newBudget={newBudget}
            setNewBudget={setNewBudget}
            title="Create New Budget"
            button_text="Create budget"
          />
          {/* <div className="create-budget-container">
            <h1 className="debt-text">Create New Budget</h1>
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
              >
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
          </div> */}
        </div>
        <div className="budget-right">
          <div className="budgets-container">
            <h1 className="debt-text">My budgets</h1>
            <div className="my-budgets">
              {budgets.map((budget, index) => (
                <div className="my-budget" key={index}>
                  <MoreVert
                    className="budget-more-options-toggler"
                    onClick={moreOptionsToggler}
                  />
                  {showMoreOptions && (
                    <div className="more-options">
                      {/* <Link
                        to={`/budget_details?budget_id=${budget.id}`}
                        className="more-options-icon"
                      > */}
                      <VisibilityOutlined
                        className="more-options-icon"
                        onClick={() =>
                          (window.location.href = `/budget_details?budget_id=${budget.id}`)
                        }
                      />
                      {/* </Link> */}
                      <ModeEditOutlined className="more-options-icon" />
                      <DeleteOutlineOutlined
                        className="more-options-icon"
                        onClick={() => {
                          if (window.confirm("Click okay")) {
                            deleteBudget(budget.id);
                          }
                        }}
                      />
                    </div>
                  )}
                  <div className="budget-info-left">
                    <div className="budget-info">
                      <CiCalendarDate className="budget-info-icon" />
                      <span>
                        {months[Number(budget?.month?.split("/")[0]) - 1] +
                          ` , ` +
                          budget.month.split("/")[1]}
                      </span>
                    </div>
                    <div className="budget-info">
                      <FaCediSign className="budget-info-icon" />
                      <span>{format_currency(budget.total_budget)}</span>
                    </div>
                    <div className="budget-info">
                      <Category className="budget-info-icon" />
                      <span>{budget.categories.length}</span>
                    </div>
                  </div>
                  <div className="budget-info-right">
                    <div className="budget-info">
                      <GiPayMoney className="budget-info-icon" />
                      <span>
                        {expensesList
                          ?.filter((item) =>
                            item.created_at.endsWith(budget.month)
                          )
                          .reduce((a, b) => a + b.total_cost, 0)}
                      </span>
                    </div>
                    <div className="budget-info">
                      <Balance className="budget-info-icon" />
                      <span>
                        {budget.estimated_budget -
                          expensesList
                            ?.filter((item) =>
                              item.created_at.endsWith(budget.month)
                            )
                            .reduce((a, b) => a + b.total_cost, 0)}
                      </span>
                    </div>
                    <div className="budget-info">
                      <GrPieChart className="budget-info-icon" />
                      <span>
                        {budget.estimated_budget -
                          expensesList
                            ?.filter((item) =>
                              item.created_at.endsWith(budget.month)
                            )
                            .reduce((a, b) => a + b.total_cost, 0) >
                        0
                          ? "Within Budget"
                          : "Over Budget"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
