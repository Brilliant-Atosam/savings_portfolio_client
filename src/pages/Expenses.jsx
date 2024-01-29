import "../styles/expenses.css";
import Topbar from "../components/Topbar";
import { Add } from "@mui/icons-material";
import Util from "../utils/util";
import Table from "../components/Table";
import { expenseColumn } from "../utils/tableData";
import ExpensesDialog from "../components/Expenses";
import useExpenses from "../hooks/useExpenses";
import AreaChartComponent from "../components/AreaChartComponent";
import { Link } from "react-router-dom";
const Expenses = () => {
  const { categories, format_currency } = Util();
  let expensesList = JSON.parse(localStorage.getItem("expenses"));
  const {
    openExpenseDialog,
    toggleExpensesDialog,
    // expensesList,
    data,
    monthly_expenses_data,
  } = useExpenses();
  return (
    <div className="main-container">
      <Topbar />
      <ExpensesDialog open={openExpenseDialog} toggle={toggleExpensesDialog} />
      <div className="expenses-container">
        <h1 className="expenses-heading debt-text">Expenses summary</h1>
        <div className="expenses-categories-container">
          {categories.map((category, index) => (
            <Link
              to={`/expenses/details?index=${index}`}
              className="category"
              key={index}
            >
              <span className="category-name">{category}:</span>
              <span className="category-value">
                {format_currency(
                  expensesList
                    .filter((item) => item.category === category)
                    ?.reduce((a, b) => a + b.total_cost, 0)
                )}
              </span>
            </Link>
          ))}
        </div>
        <div className="expenses-table-container">
          <h1 className="expenses-heading debt-text">Expenses history</h1>
          <Table columns={expenseColumn} rows={expensesList} />
        </div>
        <div className="chart-container">
          <h1 className="debt-text">Expenses chart for categories</h1>
          <AreaChartComponent data={data} />
        </div>
        <div className="chart-container">
          <h1 className="debt-text">Monthly expenses chart</h1>
          <AreaChartComponent data={monthly_expenses_data} />
        </div>
      </div>
      <div className="add-expenses-btn-container">
        <Add className="add-expenses-btn" onClick={toggleExpensesDialog} />
      </div>
    </div>
  );
};

export default Expenses;
