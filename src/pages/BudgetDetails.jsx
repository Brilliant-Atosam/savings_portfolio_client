import "../styles/budget.css";
import Topbar from "../components/Topbar";
import Util from "../utils/util";
import useBudget from "../hooks/useBudget";
import Table from "../components/Table";
import useTableData from "../utils/tableData";
import BudgetForm from "../components/BudgetForm";
import Feedback from "../components/Feedback";
const BudgetDetails = () => {
  const {
    format_currency,
    months,
    user,
    businessExpenseCategories,
    categories,
  } = Util();
  const expensesCategories =
    user?.purpose !== "personal finance"
      ? businessExpenseCategories
      : categories;
  // console.log(expensesCategories);
  const {
    expenses_within_budget_period,
    out_of_budget_expenses,
    newBudget,
    setNewBudget,
    editBudget,
    snackbar,
    handleSnackbar,
  } = useBudget();
  const { expenseColumn } = useTableData();
  return (
    <div className="main-container">
      <Topbar />
      <div className="budget-container">
        <div className="budget-left budget-detail-left">
          <div className="finance-info-container">
            <h1 className="highlight-title">
              {months[Number(newBudget?.month.split("/")[0]) - 1]},
              {newBudget?.month.split("/")[1]}
            </h1>
            <div className="info-container">
              <span className="finance-info-key">Est. Budget</span>
              <span className="finance-info-value">
                {format_currency(newBudget?.estimated_budget)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Total Budget</span>
              <span className="finance-info-value">
                {format_currency(newBudget?.total_budget)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Balance</span>
              <span className="finance-info-value">
                {format_currency(
                  newBudget.estimated_budget -
                    expenses_within_budget_period.reduce(
                      (a, b) => a + b.total_cost,
                      0
                    )
                )}
              </span>
            </div>
          </div>
          {/* details of the budget */}
          <div className="budget-details-container">
            <h1 className="heading debt-text">Budget Summary</h1>
            <table className="budget-details-table">
              <thead>
                <tr>
                  <th>Cat.</th>
                  <th>Amt.</th>
                  <th>Bal.</th>
                </tr>
              </thead>
              <tbody>
                {newBudget?.categories
                  .filter((item) => item.amount > 0)
                  .map((cat) => (
                    <tr key={cat.category}>
                      <td>{cat.category}</td>
                      <td>{format_currency(cat.amount)}</td>
                      <td>
                        {format_currency(
                          cat.amount -
                            expenses_within_budget_period
                              .filter((item) => item.category === cat.category)
                              .reduce((a, b) => a + b.total_cost, 0)
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="budget-details-container">
            <h1 className="debt-text">Out-of-Budget Expenses</h1>
            <table className="budget-details-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {out_of_budget_expenses.map((item) => (
                  <tr key={item.category}>
                    <td>{item.item}</td>
                    <td>{item.category}</td>
                    <td>{format_currency(item.total_cost)}</td>
                  </tr>
                ))}
                <tr>
                  <td>Total</td>
                  <td>
                    {out_of_budget_expenses.reduce(
                      (a, b) => a + b.total_cost,
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="budget-details-right">
          <BudgetForm
            createBudget={editBudget}
            expensesCategories={expensesCategories}
            months={months}
            newBudget={newBudget}
            setNewBudget={setNewBudget}
            showCatAmount={true}
            title={`Edit ${months[Number(newBudget?.month.split("/")[0]) - 1]},
            ${newBudget?.month.split("/")[1]}'s budget`}
            button_text="Edit budget"
          />
          <h1 className="debt-text">Expenses history</h1>
          <Table columns={expenseColumn} rows={expenses_within_budget_period} />
        </div>
      </div>
      <Feedback
        snackbar={snackbar}
        toggler={() => handleSnackbar("", "info")}
      />
    </div>
  );
};

export default BudgetDetails;
