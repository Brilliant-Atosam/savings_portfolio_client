import "../styles/highlights.css";
import Topbar from "../components/Topbar";
import Util from "../utils/util";
// import useSettings from "../hooks/useSettings";
import BarChartComponent from "../components/BarChart";
import PieChartComponent from "../components/PieChartComponent";
import Table from "../components/Table";
import { IoIosArrowRoundUp } from "react-icons/io";
// import useApp from "../useApp";
import useTableData from "../utils/tableData";
import useSave from "../hooks/useSave";
import useExpenses from "../hooks/useExpenses";
import AreaChartComponent from "../components/AreaChartComponent";
const Highlights = () => {
  const { format_currency, colors } = Util();
  // const { income_chart_data } = useSettings();
  const { savingsList, structuredPortfolio } = useSave();
  const { data, expensesList } = useExpenses();
  // const { user } = useApp();
  const { savingsColumn, expenseColumn } = useTableData();
  return (
    <div className="main-container">
      <Topbar />
      <h1 className="highlight-heading">Financial Highlights for May 2024</h1>
      <div className="highlight-container">
        <div className="highlight-left">
          <div className="finance-info-container">
            <h1 className="highlight-title">Income</h1>
            <h1 className="highlight-subtitle">May, 2024</h1>
            <div className="info-container">
              <span className="finance-info-key">Tot. Income</span>
              <span className="finance-info-value">
                {format_currency(2000)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">C2LM</span>
              <span className="finance-info-value">
                2% <IoIosArrowRoundUp />
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">C2Av.</span>
              <span className="finance-info-value">
                2% <IoIosArrowRoundUp />
              </span>
            </div>
          </div>
          <div className="highlights-charts-container">
            <h1 className="highlight-chart-title">Income Charts</h1>
            <div className="highlights-charts">
              <BarChartComponent />
              <PieChartComponent
                colors={colors}
                portfolio={structuredPortfolio}
              />
            </div>
          </div>
          <div className="finance-info-container">
            <h1 className="highlight-title">Savings</h1>
            <h1 className="highlight-subtitle">May, 2024</h1>
            <div className="info-container">
              <span className="finance-info-key">Tot. Savings</span>
              <span className="finance-info-value">
                {format_currency(2000)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Net Savings</span>
              <span className="finance-info-value">
                {format_currency(2000)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Efficiency</span>
              <span className="finance-info-value">2%</span>
            </div>
          </div>
          <div className="highlights-charts-container">
            <h1 className="highlight-chart-title">Savings Charts</h1>
            <div className="highlights-charts">
              <BarChartComponent />
              <PieChartComponent
                colors={colors}
                portfolio={structuredPortfolio}
              />
            </div>
          </div>
          <div className="highlight-history-container">
            <h1 className="highlight-chart-title">Income History</h1>
            <Table columns={savingsColumn} rows={savingsList} />
          </div>
        </div>
        <div className="highlight-right">
          <div className="finance-info-container">
            <h1 className="highlight-title">Expenses</h1>
            <h1 className="highlight-subtitle">May, 2024</h1>
            <div className="info-container">
              <span className="finance-info-key">Tot. Spendable</span>
              <span className="finance-info-value">
                {format_currency(2000)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Tot. Expenses</span>
              <span className="finance-info-value">
                {format_currency(2000)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">SUP</span>
              <span className="finance-info-value">2%</span>
            </div>
          </div>
          <div className="highlights-charts-container">
            <h1 className="highlight-chart-title">
              Spendable & Expenses Charts
            </h1>
            <div className="highlights-charts">
              <BarChartComponent />
              <PieChartComponent
                colors={colors}
                portfolio={structuredPortfolio}
              />
            </div>
          </div>
          <div className="highlight-history-container">
            <h1 className="highlight-chart-title">
              Expense Breakdown by Category
            </h1>
            <div className="chart-container">
              <AreaChartComponent data={data} />
            </div>
          </div>
          <div className="highlight-history-container">
            <h1 className="highlight-chart-title">
              Expense Breakdown by Category
            </h1>
            <Table columns={expenseColumn} rows={expensesList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
