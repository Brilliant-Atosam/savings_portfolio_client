import "../styles/budget.css";
import React from "react";
import Topbar from "../components/Topbar";
import Util from "../utils/util";
import useBudget from "../hooks/useBudget";
import Table from "../components/Table";
import useTableData from "../utils/tableData";

const BudgetDetails = () => {
  const { format_currency, months } = Util();
  const { budget_details, expenses_within_budget_period } = useBudget();
  //   console.log(budget_details);
  const { expenseColumn } = useTableData();
  return (
    <div className="main-container">
      <Topbar />
      <div className="budget-container">
        <div className="budget-left budget-detail-left">
          <div className="finance-info-container">
            <h1 className="highlight-title">
              {months[Number(budget_details.month.split("/")[0]) - 1]},{" "}
              {budget_details.month.split("/")[1]}
            </h1>
            <div className="info-container">
              <span className="finance-info-key">Est. Budget</span>
              <span className="finance-info-value">
                {format_currency(budget_details.estimated_budget)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Total Budget</span>
              <span className="finance-info-value">
                {format_currency(budget_details.total_budget)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Balance</span>
              <span className="finance-info-value">
                {expenses_within_budget_period.reduce(
                  (a, b) => a + b.total_cost,
                  0
                )}
              </span>
            </div>
          </div>
          {/* details of the budget */}
          {/* <div className="budget-details-container"> */}
          <table className="budget-details-table">
            <tr>
              <th>Cat.</th>
              <th>Amt.</th>
              <th>Bal.</th>
            </tr>
            {budget_details.categories.map((cat) => (
              <tr>
                <td>{cat.category}</td>
                <td>{format_currency(cat.amount)}</td>
                <td>
                  {cat.amount -
                    expenses_within_budget_period
                      .filter((item) => item.category === cat.category)
                      .reduce((a, b) => a + b.total_cost, 0)}
                </td>
              </tr>
            ))}
          </table>
          {/* </div> */}
        </div>
        <div className="budget-details-right">
          <h1 className="debt-text">Expenses history</h1>
          <Table columns={expenseColumn} rows={expenses_within_budget_period} />
        </div>
      </div>
    </div>
  );
};

export default BudgetDetails;
