import "../styles/highlights.css";
import Topbar from "../components/Topbar";
import Util from "../utils/util";
import useSettings from "../hooks/useSettings";
import BarChartComponent from "../components/BarChart";
import PieChartComponent from "../components/PieChartComponent";
import Table from "../components/Table";
import { IoIosArrowRoundUp } from "react-icons/io";
import useApp from "../useApp";
import useTableData from "../utils/tableData";
import useSave from "../hooks/useSave";
import useExpenses from "../hooks/useExpenses";
import AreaChartComponent from "../components/AreaChartComponent";
const Highlights = () => {
  const { format_currency, colors } = Util();
  const { income_chart_data } = useSettings();
  const { savingsList, structuredPortfolio } = useSave();
  const { data, expensesList } = useExpenses();
  const { user } = useApp();
  const { savingsColumn, expenseColumn } = useTableData();
  return (
    <div className="main-container">
      <Topbar />
      <div className="highlight-container">
        <div className="highlight-left">
          <h1 className="highlight-heading">
            Financial Highlights for May 2024
          </h1>
          <div className="">
            <h2 className="highlight-subheading">Income for May 2024</h2>
            <div className="highlights-sub-container finance-info-container">
              <div className="info-container">
                <span className="finance-info-key finance-info-key">
                  Tot. Income
                </span>
                <span className="finance-info-value finance-info-value">
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
                <span className="finance-info-key">C2Avg.</span>
                <span className="finance-info-value">89%</span>
              </div>
            </div>
            <BarChartComponent />
            <div className="piechart-container">
              <PieChartComponent
                portfolio={income_chart_data}
                colors={colors}
              />
              <div className="chart-info">
                {income_chart_data.map((item, index) => (
                  <div className="ref">
                    <div
                      className="indicators"
                      style={{ background: colors[index] }}
                    ></div>
                    <span style={{ color: colors[index], fontSize: "0.8rem" }}>
                      {item.title}(
                      {((item.amount / user.total_income) * 100).toFixed(2)}
                      %)
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <Table columns={savingsColumn} rows={savingsList} />
          </div>
          <div className="highlights">
            <h1 className="highlight-subheading">Savings for May 2024</h1>
            <div className="finance-info-container">
              <div className="info-container">
                <span className="finance-info-key">Tot. Savings</span>
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
                <span className="finance-info-key">C2Avg.</span>
                <span className="finance-info-value">89%</span>
              </div>
            </div>{" "}
            <BarChartComponent />
            <div className="piechart-container">
              <PieChartComponent
                portfolio={income_chart_data}
                colors={colors}
              />
              <div className="chart-info">
                {income_chart_data.map((item, index) => (
                  <div className="ref">
                    <div
                      className="indicators"
                      style={{ background: colors[index] }}
                    ></div>
                    <span style={{ color: colors[index], fontSize: "0.8rem" }}>
                      {item.title}(
                      {((item.amount / user.total_income) * 100).toFixed(2)}
                      %)
                    </span>
                  </div>
                ))}
              </div>
              <div className="savings-portfolios-container">
                {structuredPortfolio
                  .filter((item) => !item.archived)
                  ?.map((item, index) => (
                    <div className="portfolio" key={index}>
                      <div className="portfolio-action-container">
                        <span
                          style={{ color: `${colors[index]}` }}
                          className="portfolio-title"
                        >
                          {item?.title}({item?.percentage}%)
                        </span>
                      </div>
                      <span
                        className="portfolio-value"
                        style={{ color: [colors[index]] }}
                      >
                        {format_currency(item?.amount)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="highlight-right">
          <div className="highlights">
            <h2 className="highlight-subheading">Expenses for May 2024</h2>
            <div className="finance-info-container">
              <div className="info-container">
                <span className="finance-info-key">Tot. Expenses</span>
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
                <span className="finance-info-key">C2Avg.</span>
                <span className="finance-info-value">89%</span>
              </div>
            </div>{" "}
            <BarChartComponent />
            <div className="bar-chart-container">
              <AreaChartComponent data={data} />
            </div>
            <Table columns={expenseColumn} rows={expensesList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
