import "../styles/expenses.css";
import Topbar from "../components/Topbar";
import { GiExpense } from "react-icons/gi";
import Util from "../utils/util";
import Table from "../components/Table";
import useTableData from "../utils/tableData";
import ExpensesDialog from "../components/Expenses";
import useExpenses from "../hooks/useExpenses";
import AreaChartComponent from "../components/AreaChartComponent";
import { Link } from "react-router-dom";
import useApp from "../useApp";
import { CircularProgress } from "@mui/material";
const Expenses = () => {
  const { expenseColumn } = useTableData();
  const { loading } = useApp();
  const { categories, format_currency, dummy_monthly_data, user } = Util();
  let expensesList = JSON.parse(localStorage.getItem("expenses"));
  const {
    openExpenseDialog,
    toggleExpensesDialog,
    data,
    monthly_expenses_data,
  } = useExpenses();
  return (
    <div className="main-container">
      <Topbar />
      <ExpensesDialog open={openExpenseDialog} toggle={toggleExpensesDialog} />
      <div className="expenses-container">
        <div className="expenses-details-container">
          <div className="expenses-table-container expenses-left">
            <h1 className="expenses-heading debt-text">Expenses summary</h1>
            <div className="expenses-categories-container">
              {categories.map((category, index) => (
                <Link
                  to={`/expenses/details?index=${index}`}
                  className="category"
                  key={index}
                >
                  <category.icon className="cat-icons" />
                  <span className="category-name">{category.title}:</span>
                  <span className="category-value">
                    {format_currency(
                      Number(
                        expensesList
                          .filter((item) => item.category === category.title)
                          ?.reduce((a, b) => a + b.total_cost, 0)
                      )
                    )}
                  </span>
                </Link>
              ))}
            </div>
            <h1 className="expenses-heading debt-text">Expenses history</h1>
            {loading && <CircularProgress />}
            <Table columns={expenseColumn} rows={expensesList} />
          </div>
          <div className="expenses-right">
            <div className="chart-container">
              <h1 className="debt-text">Expenses chart for categories</h1>
              <AreaChartComponent data={data} />
            </div>
            <div className="chart-container">
              <h1 className="debt-text">Monthly expenses chart</h1>
              <AreaChartComponent
                data={
                  monthly_expenses_data.reduce(
                    (a, b) => a + b.total_expenses,
                    0
                  ) > 0 && user?.tier !== "premium"
                    ? dummy_monthly_data
                    : monthly_expenses_data
                }
              />
              {monthly_expenses_data.reduce((a, b) => a + b.total_expenses, 0) >
                0 &&
                user?.tier !== "premium" && (
                  <h1 className="no-data-text">
                    This could be your data displayed in the chart above.
                    <a href="/" className="link">
                      Learn more
                    </a>
                  </h1>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="action-container">
        <div
          className="add-expenses-btn-container"
          onClick={toggleExpensesDialog}
        >
          <GiExpense className="add-expenses-btn" />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
