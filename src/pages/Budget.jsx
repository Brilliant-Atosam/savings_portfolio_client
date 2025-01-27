import "../styles/budget.css";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import {
  Balance,
  Category,
  DeleteOutlineOutlined,
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
    // budgets,
    showMoreOptions,
    moreOptionsToggler,
    deleteBudget,
  } = useBudget();
  const { expensesList } = useExpenses();
  const budgets = JSON.parse(window.localStorage.getItem("budgets")) || [];
  // console.log(budgets);

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
        </div>
        <div className="budget-right">
          <div className="budgets-container">
            <h1 className="debt-text">My budgets</h1>
            <div className="my-budgets">
              {budgets?.map((budget, index) => (
                <div className="my-budget" key={index}>
                  <MoreVert
                    className="budget-more-options-toggler"
                    onClick={moreOptionsToggler}
                  />
                  {showMoreOptions && (
                    <div className="more-options">
                      <VisibilityOutlined
                        className="more-options-icon"
                        onClick={() =>
                          (window.location.href = `/budget_details?budget_id=${budget.id}`)
                        }
                      />
                      {/* <ModeEditOutlined className="more-options-icon" /> */}
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
                      <span>
                        {
                          budget.categories.filter((cat) => cat.amount > 0)
                            .length
                        }
                      </span>
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
