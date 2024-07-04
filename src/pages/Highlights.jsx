import "../styles/highlights.css";
import Topbar from "../components/Topbar";
import Util from "../utils/util";
import BarChartComponent from "../components/BarChart";
import PieChartComponent from "../components/PieChartComponent";
import Table from "../components/Table";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import useTableData from "../utils/tableData";
import AreaChartComponent from "../components/AreaChartComponent";
import useHighlights from "../hooks/useHighlights";
import Footer from "../components/Footer";
const Highlights = () => {
  const { format_currency, colors, months } = Util();
  const {
    total_income,
    monthly_data,
    income_chart_data,
    total_savings,
    total_expenses,
    savings_chart_data,
    income_savings,
    expenses,
    expenses_chart_data,
    income_sources_chart_data,
    structuredPortfolio,
    category_chart_data,
    query_array,
  } = useHighlights();
  const {
    income_c2a_p,
    income_c2lm_p,
    income_c2a,
    income_c2lm,
    expenses_c2a,
    expenses_c2a_p,
    expenses_c2lm,
    expenses_c2lm_p,
  } = monthly_data;

  const { savingsColumn, expenseColumn } = useTableData();
  return (
    <div className="main-container">
      <Topbar />
      <h1 className="highlight-heading">{`Financial Highlights for ${
        months[Number(query_array[0]) - 1]
      }, ${query_array[1]}`}</h1>
      <div className="highlight-container">
        <div className="highlight-left">
          <div className="finance-info-container">
            <h1 className="highlight-title">Income</h1>
            <h1 className="highlight-subtitle">{`${
              months[Number(query_array[0]) - 1]
            }, ${query_array[1]}`}</h1>
            <div className="info-container">
              <span className="finance-info-key">Tot. Income</span>
              <span className="finance-info-value">
                {format_currency(total_income)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">C2LM</span>
              <span className="finance-info-value">{income_c2lm}</span>
              <span className="finance-info-value">
                {income_c2lm_p}%
                {income_c2lm > 0 ? (
                  <IoIosArrowRoundUp />
                ) : (
                  <IoIosArrowRoundDown fill="#ff3399" />
                )}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">C2Av.</span>
              <span className="finance-info-value">{income_c2a}</span>
              <span className="finance-info-value">
                {income_c2a_p}%
                {income_c2a > 0 ? (
                  <IoIosArrowRoundUp />
                ) : (
                  <IoIosArrowRoundDown fill="#ff3399" />
                )}
              </span>
            </div>
          </div>
          <div className="highlights-charts-container">
            <h1 className="highlight-chart-title">Income Charts</h1>
            <div className="highlights-charts">
              <BarChartComponent data={income_chart_data} />
              <PieChartComponent
                colors={colors}
                portfolio={income_sources_chart_data}
              />
            </div>
          </div>
          <div className="finance-info-container">
            <h1 className="highlight-title">Savings</h1>
            <h1 className="highlight-subtitle">{`${
              months[Number(query_array[0]) - 1]
            }, ${query_array[1]}`}</h1>
            <div className="info-container">
              <span className="finance-info-key">Tot. Savings</span>
              <span className="finance-info-value">
                {format_currency(total_savings)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Net Savings</span>
              <span className="finance-info-value">
                {format_currency(total_income - total_expenses)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Efficiency</span>
              <span className="finance-info-value">
                {(
                  ((total_income - total_expenses) / total_savings) *
                  100
                ).toFixed(2)}
                %
              </span>
            </div>
          </div>
          <div className="highlights-charts-container">
            <h1 className="highlight-chart-title">Savings Charts</h1>
            <div className="highlights-charts">
              <BarChartComponent data={savings_chart_data} />
              <PieChartComponent
                colors={colors}
                portfolio={structuredPortfolio}
              />
            </div>
          </div>
          <div className="highlight-history-container">
            <h1 className="highlight-chart-title">Income History</h1>
            <Table columns={savingsColumn} rows={income_savings} />
          </div>
        </div>
        <div className="highlight-right">
          <div className="finance-info-container">
            <h1 className="highlight-title">Expenses</h1>
            <h1 className="highlight-subtitle">
              {`${months[Number(query_array[0]) - 1]}, ${query_array[1]}`}
            </h1>
            <div className="info-container">
              <span className="finance-info-key">Tot. Spendable</span>
              <span className="finance-info-value">
                {format_currency(total_income - total_savings)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Tot. Expenses</span>
              <span className="finance-info-value">
                {format_currency(total_expenses)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">SUP</span>
              <span className="finance-info-value">
                {(
                  (total_expenses / (total_income - total_expenses)) *
                  100
                ).toFixed(2)}
                %
              </span>
            </div>
          </div>
          <div className="highlights-charts-container">
            <h1 className="highlight-chart-title">
              Spendable & Expenses Charts
            </h1>
            <div className="highlights-charts">
              <BarChartComponent data={expenses_chart_data} />
              <PieChartComponent
                colors={colors}
                portfolio={category_chart_data.sort((a, b) =>
                  a.amount > b.amount ? -1 : 1
                )}
              />
            </div>
          </div>
          <div className="finance-info-container">
            <h1 className="highlight-title">Expenses</h1>
            <h1 className="highlight-subtitle">{`${
              months[Number(query_array[0] - 1)]
            }, ${query_array[1]}`}</h1>
            <div className="info-container">
              <span className="finance-info-key">Tot. Expenses</span>
              <span className="finance-info-value">
                {format_currency(total_expenses)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">C2LM</span>
              <span className="finance-info-value">{expenses_c2lm}</span>
              <span className="finance-info-value">
                {expenses_c2lm_p}%
                {expenses_c2lm > 0 ? (
                  <IoIosArrowRoundUp />
                ) : (
                  <IoIosArrowRoundDown fill="#ff3399" />
                )}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">C2Av.</span>
              <span className="finance-info-value">{expenses_c2a}</span>
              <span className="finance-info-value">
                {expenses_c2a_p}%
                {expenses_c2a > 0 ? (
                  <IoIosArrowRoundUp />
                ) : (
                  <IoIosArrowRoundDown fill="#ff3399" />
                )}
              </span>
            </div>
          </div>
          <div className="highlight-history-container">
            <h1 className="highlight-chart-title">
              Expense Breakdown by Category
            </h1>
            <div className="chart-container">
              <AreaChartComponent data={category_chart_data} />
            </div>
          </div>
          <div className="highlight-history-container">
            <h1 className="highlight-chart-title">
              Expense Breakdown by Category
            </h1>
            <Table columns={expenseColumn} rows={expenses} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Highlights;
