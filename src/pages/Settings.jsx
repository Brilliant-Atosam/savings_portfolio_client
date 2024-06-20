import "../styles/settings.css";
import BasicInfo from "../components/BasicInfo";
import Password from "../components/Password";
import Topbar from "../components/Topbar";
import useSettings from "../hooks/useSettings";
import useApp from "../useApp";
import PieChartComponent from "../components/PieChartComponent";
import { TbLockCog } from "react-icons/tb";
import { FaUserCog } from "react-icons/fa";
import {
  MarkunreadOutlined,
  PersonOutlined,
  PhoneIphoneOutlined,
  QueryBuilderOutlined,
} from "@mui/icons-material";
import Util from "../utils/util";
import AreaChartComponent from "../components/AreaChartComponent";
import useSave from "../hooks/useSave";
const Settings = () => {
  const { user } = useApp();
  const { format_currency, colors, dummy_monthly_data } = Util();
  const { monthly_data, savingsList } = useSave();
  const {
    handleOpenPass,
    openPass,
    handlePasswordChange,
    handle_open_basic_info_dialog,
    show_basic_info_dialog,
    handle_basic_info,
    chart_data,
    income_chart_data,
    total_expenses,
    total_income,
    total_savings,
    total_advance,
    total_spendable,
    spendable_utilization_percentage,
    savings_efficiency,
    actual_savings,
    peak_month,
    average_income,
    average_savings,
    average_expenses,
    peak_expenses,
    peak_savings,
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
                  <div className="ref">
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
              <h1 className="debt-text">Summary Chart</h1>
              {chart_data.reduce((a, b) => a + b.amount, 0) < 1 ? (
                <h1 className="no-data-text">No data to display chart</h1>
              ) : (
                <PieChartComponent colors={colors} portfolio={chart_data} />
              )}
              <div className="chart-info">
                {chart_data.map((item, index) => (
                  <div className="ref">
                    <div
                      className="indicators"
                      style={{ background: colors[index] }}
                    ></div>
                    <span style={{ color: colors[index] }}>
                      {item.title}(
                      {((item.amount / total_income) * 100).toFixed(2)})%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="summary-container">
            <div className="top-summary-container">
              <h1 className="debt-text">
                Financial Summary - {new Date().getFullYear()}
              </h1>
              <div className="financial-summary">
                <div className="financial-summary-category">
                  <h1 className="financial-summary-category-heading">
                    Income Category
                  </h1>
                  <div className="category-container">
                    <div className="key-value-container">
                      <span className="key">Total Income: </span>
                      <span className="value">
                        {format_currency(total_income)}
                      </span>
                    </div>
                    <div className="key-value-container">
                      <span className="key">Peak Income: </span>
                      <span className="value">
                        {format_currency(peak_month?.total_income)} (
                        {peak_month.title})
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
                        <span className="key">Gross Savings: </span>
                        <span className="value">
                          {format_currency(total_savings)} [
                          {((total_savings / total_income) * 100).toFixed(2)}%]
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Actual Savings: </span>
                        <span className="value">
                          {format_currency(actual_savings)} [
                          {((actual_savings / total_income) * 100).toFixed(2)}
                          %]
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
                          {((total_spendable / total_income) * 100).toFixed(2)}
                          %]
                        </span>
                      </div>
                      <div className="key-value-container">
                        <span className="key">Total Expenses: </span>
                        <span className="value">
                          {format_currency(total_expenses)} [
                          {((total_expenses / total_income) * 100).toFixed(2)}%]
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
                          Spendable Utilization Percentage:
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
                            ? "Spend within the the spendable"
                            : "Spend beyond the spendable"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="key-value-container">
                  <span className="key">Total Advance balance: </span>
                  <span className="value">
                    {format_currency(total_advance)}
                  </span>
                </div>
              </div>
            </div>
            <div className="chart-container">
              <h1 className="debt-text">
                Monthly Financial Summary Chart: {new Date().getFullYear()}
              </h1>
              {
                <AreaChartComponent
                  data={
                    monthly_data.reduce((a, b) => a + b.total_income, 0) > 0 &&
                    user?.tier !== "premium"
                      ? dummy_monthly_data
                      : monthly_data
                  }
                />
              }
              {savingsList.reduce((a, b) => a + b.saved, 0) > 0 &&
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
    </div>
  );
};

export default Settings;
