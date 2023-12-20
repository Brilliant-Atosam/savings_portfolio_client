import "../styles/dashboard.css";
import Topbar from "../components/Topbar";
import Table from "../components/Table";
import QuickSummary from "../components/QuickSummary";
import useApp from "../useApp";
import { savingsColumn } from "../utils/tableData";
const Dashboard = () => {
  const { savingsList } = useApp();
  return (
    <div className="main-container">
      <Topbar />
      <div className="dashboard-container">
        <QuickSummary />
        <div className="dashboard-right">
          <h1 className="debt-text">Savings history</h1>
          {<Table columns={savingsColumn} rows={savingsList} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
