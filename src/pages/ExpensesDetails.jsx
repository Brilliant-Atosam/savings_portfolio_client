import "../styles/expenses.css";
import Topbar from "../components/Topbar";
import Table from "../components/Table";
import AreaChartComponent from "../components/AreaChartComponent";
import useExpenses from "../hooks/useExpenses";
import Util from "../utils/util";
import useTableData from "../utils/tableData";
import Footer from "../components/Footer";
import BarChartComponent from "../components/BarChart";
import moment from "moment";
import useSave from "../hooks/useSave";

const ExpensesDetails = () => {
  const { expenseColumn } = useTableData();
  const { categories, format_currency } = Util();
  const { expensesList, monthly_expenses_data, query, handleYear, year } =
    useExpenses();
  const { years_spent_on_cashlens } = useSave();
  const bar_chart_data = [
    {
      name: "expenses",
      cur_perf: expensesList
        ?.filter((item) =>
          item?.created_at?.endsWith(moment().format("MM/YYYY"))
        )
        ?.reduce((a, b) => a + b.total_cost, 0),
      avg_perf: Number(
        (
          expensesList?.reduce((a, b) => a + b.total_cost, 0) /
          expensesList?.length
        ).toFixed(2)
      ),
      prev_perf: expensesList
        ?.filter((item) =>
          item?.created_at?.endsWith(
            new Date().getMonth() === 0
              ? `12/${new Date().getFullYear() - 1}`
              : `${String(new Date().getMonth()).padStart(
                  2,
                  "0"
                )}/${new Date().getFullYear()}`
          )
        )
        ?.reduce((a, b) => a + b.total_cost, 0),
      peak_perf: expensesList?.sort((a, b) =>
        a.total_cost > b.total_cost ? -1 : 1
      )[0]?.total_cost,
    },
  ];
  return (
    <div className="main-container">
      <Topbar />
      <div className="expenses-container">
        <h1 className="expenses-heading debt-text">
          Expenses details: {categories[query].title} -
          {format_currency(expensesList?.reduce((a, b) => a + b.total_cost, 0))}
        </h1>
        <div className="expenses-details-top">
          <div className="chart-container">
            <h1 className="debt-text">Monthly expenses chart: {year}</h1>
            <div className="chart-filter-container">
              {years_spent_on_cashlens.map((year) => (
                <button
                  className="chart-filter"
                  onClick={(e) => handleYear(e?.target?.innerText)}
                >
                  {year}
                </button>
              ))}
            </div>
            <AreaChartComponent data={monthly_expenses_data} />
          </div>
          <BarChartComponent data={bar_chart_data} />
        </div>

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
