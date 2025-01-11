import "../styles/settings.css";
import BasicInfo from "../components/BasicInfo";
import Password from "../components/Password";
import Topbar from "../components/Topbar";
import useSettings from "../hooks/useSettings";
import useApp from "../useApp";
import PieChartComponent from "../components/PieChartComponent";
import { TbLockCog } from "react-icons/tb";
import { FaUserCog } from "react-icons/fa";
import { GrAchievement } from "react-icons/gr";
import {
  MarkunreadOutlined,
  PersonOutlined,
  PhoneIphoneOutlined,
  QueryBuilderOutlined,
} from "@mui/icons-material";
import Util from "../utils/util";
import AreaChartComponent from "../components/AreaChartComponent";
import useSave from "../hooks/useSave";
import Footer from "../components/Footer";
import moment from "moment";
// import Overlay from "../components/Overlay";
const Settings = () => {
  const { user } = useApp();
  const { format_currency, colors, months } = Util();
  const { monthly_data, structuredPortfolio } = useSave();
  const {
    handleOpenPass,
    openPass,
    handlePasswordChange,
    handle_open_basic_info_dialog,
    show_basic_info_dialog,
    handle_basic_info,
    income_chart_data,
    total_expenses,
    actual_total_expenses,
    total_income,
    total_earned_income,
    total_savings,
    total_spendable,
    spendable_utilization_percentage,
    savings_efficiency,
    actual_savings,
    peak_income,
    average_income,
    average_savings,
    average_expenses,
    peak_expenses,
    peak_savings,
    total_borrow_balance,
    total_borrowed,
    total_borrow_repayment,
    total_lent,
    total_lent_repayment,
    lent_balance,
  } = useSettings();
  return (
    <div className="main-container">
      <Topbar />
      <Password
        open={openPass}
        handleOpenPass={handleOpenPass}
        handlePassChange={handlePasswordChange}
      />
      <BasicInfo
        open={show_basic_info_dialog}
        handleOpenBasicInfo={handle_open_basic_info_dialog}
        handleBasicInfoChange={handle_basic_info}
      />
      <div className="settings-container">
        <div className="settings-sub-container">
          <div className="account-info-container">
            <div className="account-info">
              <div className="account-info-top">
                <h1 className="debt-text">My profile</h1>
              </div>
              <div className="account-info-middle">
                <div className="info">
                  <PersonOutlined /> <span>{user.name}</span>
                </div>
                <div className="info">
                  <MarkunreadOutlined />
                  <span>{user.email}</span>
                </div>
                <div className="info">
                  <PhoneIphoneOutlined /> <span>{user.phone}</span>
                </div>
                <span className="date-joined">
                  <QueryBuilderOutlined /> {user.createdAt}
                </span>
              </div>
            </div>
            <div className="income-streams-container">
              <h1 className="debt-text">My income streams</h1>
              {income_chart_data.length < 1 ? (
                <h1 className="no-data-text">
                  No available data to display chart
                </h1>
              ) : (
                <PieChartComponent
                  colors={colors}
                  portfolio={income_chart_data}
                />
              )}
              <div className="chart-info">
                {income_chart_data.map((item, index) => (
                  <div className="ref" key={colors[index]}>
                    <div
                      className="indicators"
                      style={{ background: colors[index] }}
                    ></div>
                    <span style={{ color: colors[index], fontSize: "0.8rem" }}>
                      {item.title}(
                      {((item.amount / total_income) * 100).toFixed(2)}
                      %)
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bottom-summary-container">
              <h1 className="debt-text">Saving Goals & Milestones</h1>
              <div className="portfolio-main-container">
                {structuredPortfolio
                  ?.filter((portfolio) => !portfolio.archived)
                  ?.map((item, index) => (
                    <div
                      className="portfolio-milestone-container"
                      key={item.title}
                    >
                      <span className="key">
                        {`${item?.title} (${item?.percentage}% of income)`}{" "}
                        {item?.amount > Number(item?.goal) && (
                          <GrAchievement fill={colors[index]} />
                        )}
                      </span>

                      <div className="milestone-progress-bar">
                        <div
                          className="milestone-progress"
                          style={{
                            width: `${
                              (item?.amount / Number(item?.goal)) * 100
                            }%`,
                            background: colors[index],
                          }}
                        ></div>
                      </div>
                      <div className="milestone-range">
                        <span>0</span>
                        <span>{item?.goal}</span>
                      </div>
                      <div className="milestone-details">
                        <h2 className="milestone-details-heading">
                          Details of Progress
                        </h2>
                        <div className="milestone-key-value">
                          <span className="key">Progress</span>
                          <span className="value">
                            {format_currency(item?.amount)}
                          </span>
                        </div>
                        <div className="milestone-key-value">
                          <span className="key">Progress Percentage</span>
                          <span className="value">
                            {(
                              (item?.amount / Number(item?.goal)) *
                              100
                            ).toFixed(2)}
                            %
                          </span>
                        </div>
                        {Number(item?.goal) - item?.amount > 0.1 && (
                          <div className="milestone-key-value">
                            <span className="key">Goal Gap</span>
                            <span className="value">
                              {format_currency(
                                Number(item?.goal) - item?.amount
                              )}
                            </span>
                          </div>
                        )}
                        <div className="milestone-key-value">
                          <span className="key">Due Date</span>
                          <span className="value">
                            {item?.deadline} -
                            {moment().to(moment(item?.deadline, "DD/MM/YYYY"))}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="summary-container">
            <div className="chart-container borrowing-chart-container ">
              <h1 className="debt-text">
                Monthly Financial Summary Chart: {new Date().getFullYear()}
              </h1>
              {<AreaChartComponent data={monthly_data} />}
            </div>
            <div className="top-summary-container">
              <h1 className="debt-text">Financial Summary</h1>
              <div className="financial-summary">
                <div className="financial-summary-category">
                  <h1 className="financial-summary-category-heading">
                    Income Category
                  </h1>
                  <div className="category-container">
                    <div className="key-value-container">
                      <span className="key">Total Income: </span>
                      <span className="value">
                        {format_currency(total_income)} (+ loan received)
                      </span>
                    </div>
                    <div className="key-value-container">
                      <span className="key">Total Earned Income: </span>
                      <span className="value">
                        {format_currency(total_earned_income)} (- loan received)
                      </span>
                    </div>
                    <div className="key-value-container">
                      <span className="key">Peak Income: </span>
                      <span className="value">
                        {format_currency(peak_income?.total_income)} (
                        {`${months[peak_income.title.split("/")[0] - 1]}, ${
                          peak_income.title.split("/")[1]
                        }`}
                        )
                      </span>
                    </div>
                    <div className="key-value-container">
                      <span className="key">Avg Monthly Inc: </span>
                      <span className="value">
                        {format_currency(average_income)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="financial-summary">
                  <div className="financial-summary-category">
                    <h1 className="financial-summary-category-heading">
                      Savings Category
                    </h1>
                    <div className="category-container">
                      <div className="key-value-container">
                        <span className="key">Projected Savings: </span>
                        <span className="value">
                          {format_currency(total_savings)} [
                          {isNaN(total_savings / total_income)
                            ? 0
                            : ((total_savings / total_income) * 100).toFixed(2)}
                          % of income]
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Actual Savings: </span>
                        <span className="value">
                          {format_currency(actual_savings)} [
                          {isNaN(actual_savings / total_income)
                            ? 0
                            : ((actual_savings / total_income) * 100).toFixed(
                                2
                              )}
                          % of income]
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Savings at hand: </span>
                        <span className="value">
                          {format_currency(actual_savings - lent_balance)} [
                          {isNaN((actual_savings - lent_balance) / total_income)
                            ? 0
                            : (
                                ((actual_savings - lent_balance) /
                                  total_income) *
                                100
                              ).toFixed(2)}
                          % of income]
                        </span>
                      </div>

                      <div className="key-value-container">
                        <span className="key">Savings Efficiency: </span>
                        <span className="value">{savings_efficiency}%</span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Peak Savings: </span>
                        <span className="value">
                          {format_currency(peak_savings[0].total_savings)} [
                          {peak_savings[0].title}]
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Average Monthly Savings: </span>
                        <span className="value">
                          {format_currency(average_savings)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="financial-summary">
                  <div className="financial-summary-category">
                    <h1 className="financial-summary-category-heading">
                      Spendable & Expenses Category
                    </h1>
                    <div className="category-container">
                      <div className="key-value-container">
                        <span className="key">Total Spendable: </span>
                        <span className="value">
                          {format_currency(total_spendable)} [
                          {isNaN(total_spendable / total_income)
                            ? 0
                            : ((total_spendable / total_income) * 100).toFixed(
                                2
                              )}
                          %]
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Total Expenses: </span>
                        <span className="value">
                          {format_currency(total_expenses)} [
                          {isNaN(total_expenses / total_income)
                            ? 0
                            : ((total_expenses / total_income) * 100).toFixed(
                                2
                              )}
                          %] (+ loan payments)
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Actual Expenses: </span>
                        <span className="value">
                          {format_currency(actual_total_expenses)} [
                          {isNaN(actual_total_expenses / total_income)
                            ? 0
                            : (
                                (actual_total_expenses / total_income) *
                                100
                              ).toFixed(2)}
                          %] (- loan payments)
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Spending Variance: </span>
                        <span className="value">
                          {total_spendable - total_expenses}
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">
                          Spendable Utilization Percentage (SUP):
                        </span>
                        <span className="value">
                          {spendable_utilization_percentage}%
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Average Monthly Expenses:</span>
                        <span className="value">
                          {format_currency(average_expenses)}
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Peak Expenses:</span>
                        <span className="value">
                          {format_currency(peak_expenses.total_expenses)} [
                          {peak_expenses.title}]
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Spending status:</span>
                        <span className="value">
                          {spendable_utilization_percentage < 100
                            ? "Spend within the spendable"
                            : "Spend beyond the spendable"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="financial-summary">
                  <div className="financial-summary-category">
                    <h1 className="financial-summary-category-heading">
                      Debt & Repayment Category
                    </h1>
                    <div className="category-container">
                      <div className="key-value-container">
                        <span className="key">Total Amount Borrowed: </span>
                        <span className="value">
                          {format_currency(total_borrowed)}
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Total Repayment: </span>
                        <span className="value">
                          {format_currency(total_borrow_repayment)}
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Balance:</span>
                        <span className="value">
                          {format_currency(total_borrow_balance)}
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Total Amount lent: </span>
                        <span className="value">
                          {format_currency(total_lent)}
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Total Amount Settled:</span>
                        <span className="value">
                          {format_currency(total_lent_repayment)}
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Balance:</span>
                        <span className="value">
                          {format_currency(lent_balance)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="action-container loan-action-container">
        <div
          className="add-expenses-btn-container"
          onClick={handle_open_basic_info_dialog}
        >
          <FaUserCog className="add-expenses-btn" />
        </div>
        <div
          className="add-expenses-btn-container"
          onClick={() => handleOpenPass()}
        >
          <TbLockCog className="add-expenses-btn" />
        </div>
      </div>
      {/* {user?.tier !== "premium" && <Overlay />} */}
      <Footer />
    </div>
  );
};

export default Settings;
