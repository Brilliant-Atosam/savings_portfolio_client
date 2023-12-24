import "../styles/dashboard.css";
import Topbar from "../components/Topbar";
import Table from "../components/Table";
import QuickSummary from "../components/QuickSummary";
import useApp from "../useApp";
import { savingsColumn } from "../utils/tableData";
const Dashboard = () => {
  let { savingsList } = useApp();
  let sortedSavingList = savingsList?.sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1
  );
  return (
    <div className="main-container">
      <Topbar />
      <div className="dashboard-container">
        <QuickSummary />
        <div className="dashboard-right">
          <h1 className="debt-text">Savings history</h1>
          {
            <Table
              columns={savingsColumn}
              rows={savingsList?.sort((a, b) =>
                a.createdAt > b.createdAt ? -1 : 1
              )}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
