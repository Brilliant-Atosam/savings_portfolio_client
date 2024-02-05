import "../styles/expenses.css";
import Topbar from "../components/Topbar";
import Table from "../components/Table";
import AreaChartComponent from "../components/AreaChartComponent";
import useExpenses from "../hooks/useExpenses";
import Util from "../utils/util";
import useTableData from "../utils/tableData";

const ExpensesDetails = () => {
  const { expenseColumn } = useTableData();
  const { categories } = Util();
  const { expensesList, monthly_expenses_data, query } = useExpenses();
  return (
    <div className="main-container">
      <Topbar />
      <div className="expenses-container">
        <h1 className="expenses-heading debt-text">
          Expenses details: {categories[query]}
        </h1>
        <div className="expenses-table-container">
          <h1 className="expenses-heading debt-text">Expenses history</h1>
          <Table columns={expenseColumn} rows={expensesList} />
        </div>
        <div className="chart-container">
          <h1 className="debt-text">Monthly expenses chart</h1>
          <AreaChartComponent data={monthly_expenses_data} />
        </div>
      </div>
    </div>
  );
};

export default ExpensesDetails;
