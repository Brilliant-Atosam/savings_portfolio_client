import "../styles/dashboard.css";
import Topbar from "../components/Topbar";
import Table from "../components/Table";
import QuickSummary from "../components/QuickSummary";
import AreaChartComponents from "../components/AreaChartComponent";
import useApp from "../useApp";
import { CircularProgress } from "@mui/material";
import useTableData from "../utils/tableData";
import useSave from "../hooks/useSave";
import Util from "../utils/util";
// import Subscription from "../components/Subscription";
const Dashboard = () => {
  const { savingsColumn } = useTableData();
  let { savingsList, loading } = useApp();
  const { monthly_data } = useSave();
  const { user, dummy_monthly_data } = Util();
  return (
    <div className="main-container">
      <Topbar />
      <div className="dashboard-container">
        <QuickSummary />
        <div className="dashboard-right">
          <h1 className="debt-text">Income history</h1>{" "}
          {loading && <CircularProgress />}
          <Table columns={savingsColumn} rows={savingsList} />
          <h1 className="debt-text">Monthly savings chart</h1>
          <div className="chart-container">
            <AreaChartComponents
              data={
                user?.tier !== "premium" ? dummy_monthly_data : monthly_data
              }
            />
            {user?.tier !== "premium" && (
              <h1 className="no-data-text">
                This could be your data displayed in the chart above.
                <a href="/" className="link">
                  Learn more
                </a>
              </h1>
            )}
          </div>
          {/* <Subscription /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
