import "../styles/settings.css";
import BasicInfo from "../components/BasicInfo";
import Password from "../components/Password";
import Topbar from "../components/Topbar";
import useSettings from "../hooks/useSettings";
import useApp from "../useApp";
import PieChartComponent from "../components/PieChartComponent";
import logo from "../logo1.png";
import {
  MarkunreadOutlined,
  PersonOutlined,
  PhoneIphoneOutlined,
  QueryBuilderOutlined,
} from "@mui/icons-material";
import Util from "../utils/util";
import AreaChartComponent from "../components/AreaChartComponent";

const Settings = () => {
  const { user } = useApp();
  const { format_currency, colors } = Util();
  const {
    handleOpenPass,
    openPass,
    handlePasswordChange,
    handle_open_basic_info_dialog,
    show_basic_info_dialog,
    handle_basic_info,
    chart_data,
    income_chart_data,
    monthly_income_data,
    total_expenses,
    total_income,
    total_savings,
    total_advance,
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
            <img src={logo} alt="cashlens' logo" className="avatar" />
            <div className="account-info">
              <div className="account-info-top">
                <h1 className="debt-text">My profile</h1>
                <span className="date-joined">
                  <QueryBuilderOutlined /> {user.createdAt}
                </span>
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
              </div>
            </div>
            <div className="income-streams-container">
              <h1 className="debt-text">My income streams</h1>
              {income_chart_data.length < 1 ? (
                <h1 className="no-data-text">No data to display chart</h1>
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
                    <span style={{ color: colors[index] }}>
                      {item.title}(
                      {((item.amount / user.total_income) * 100).toFixed(2)}
                      %)
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="account-info-bottom">
              <button
                className="settings-action-btn"
                onClick={handle_open_basic_info_dialog}
              >
                Edit info
              </button>
              <button
                className="settings-action-btn"
                onClick={() => handleOpenPass()}
              >
                Change password
              </button>
            </div>
          </div>
          <div className="summary-container">
            <div className="top-summary-container">
              <h1 className="debt-text">Financial Summary</h1>
              <div className="financial-summary">
                <div className="key-value-container">
                  <span className="key">Total Income: </span>
                  <span className="value">{format_currency(total_income)}</span>
                </div>
                <div className="key-value-container">
                  <span className="key">Total Savings: </span>
                  <span className="value">
                    {format_currency(total_savings)}
                  </span>
                </div>
                <div className="key-value-container">
                  <span className="key">Total Expenses: </span>
                  <span className="value">
                    {format_currency(total_expenses)}
                  </span>
                </div>
                <div className="key-value-container">
                  <span className="key">Total Advance balance: </span>
                  <span className="value">
                    {format_currency(total_advance)}
                  </span>
                </div>
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
                      {((item.amount / user.total_income) * 100).toFixed(2)})%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="chart-container">
              <h1 className="debt-text">Monthly Income Chart</h1>
              <AreaChartComponent data={monthly_income_data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
