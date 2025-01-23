import "../styles/expenses.css";
import Topbar from "../components/Topbar";
import Table from "../components/Table";
import AreaChartComponent from "../components/AreaChartComponent";
import useExpenses from "../hooks/useExpenses";
import Util from "../utils/util";
import useTableData from "../utils/tableData";
import Footer from "../components/Footer";
import BarChartComponent from "../components/BarChart";

const ExpensesDetails = () => {
  const { expenseColumn } = useTableData();
  const { categories, format_currency } = Util();
  const { expensesList, monthly_expenses_data, query } = useExpenses();
  const bar_chart_data = [
    {
      name: "expenses",
      cur_perf: 100,
      avg_perf: 140,
      prev_perf: 130,
      peak_perf: expensesList?.sort((a,b)=> a.t),
    },
  ];
  return (
    <div className="main-container">
      <Topbar />
      <div className="expenses-container">
        <div className="expenses-details-top">
          <div className="chart-container">
            <h1 className="debt-text">Monthly expenses chart</h1>
            <AreaChartComponent data={monthly_expenses_data} />
          </div>
          <BarChartComponent data={bar_chart_data} />
        </div>
        <h1 className="expenses-heading debt-text">
          Expenses details: {categories[query].title} -{" "}
          {format_currency(expensesList?.reduce((a, b) => a + b.total_cost, 0))}
        </h1>
        <div className="expenses-table-container">
          <h1 className="expenses-heading debt-text">Expenses history</h1>
          <Table columns={expenseColumn} rows={expensesList} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExpensesDetails;
