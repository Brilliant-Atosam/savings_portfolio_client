import "../styles/highlights.css";
import Topbar from "../components/Topbar";
import Util from "../utils/util";
import useSettings from "../hooks/useSettings";
import BarChartComponent from "../components/BarChart";
import PieChartComponent from "../components/PieChartComponent";
import { IoIosArrowRoundUp } from "react-icons/io";
import useApp from "../useApp";
const Highlights = () => {
  const { format_currency, colors } = Util();
  const { income_chart_data } = useSettings();
  const { user } = useApp();
  return (
    <div className="main-container">
      <Topbar />
      <div className="highlight-container">
        <div className="highlight-left">
          <h1 className="highlight-heading">
            Financial Highlights for May 2024
          </h1>
          <div className="highlights">
            <h2 className="highlight-subheading">Income for May 2024</h2>
            <div className="highlights-sub-container">
              <div className="highlight-info-container">
                <span className="highlight-info-title">Tot. Income</span>
                <span className="highlight-info-value">
                  {format_currency(2000)}
                </span>
              </div>
              <div className="highlight-info-container">
                <span className="highlight-info-title">C2LM</span>
                <span className="highlight-info-value">
                  2% <IoIosArrowRoundUp />
                </span>
              </div>
              <div className="highlight-info-container">
                <span className="highlight-info-title">C2Avg.</span>
                <span className="highlight-info-value">89%</span>
              </div>
            </div>{" "}
            <BarChartComponent />
            <PieChartComponent portfolio={income_chart_data} colors={colors} />
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
        </div>
        <div className="highlight-right">right</div>
      </div>
    </div>
  );
};

export default Highlights;
