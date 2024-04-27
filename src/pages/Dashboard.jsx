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
import { FaHandHoldingDollar } from "react-icons/fa6";
import Save from "../components/Save";
// import Subscription from "../components/Subscription";
const Dashboard = () => {
  const { handleSave, handleSaveDialog, showSaveDialog } = useSave();
  const { savingsColumn } = useTableData();
  let { savingsList, loading } = useApp();
  const { monthly_data } = useSave();
  const { user, dummy_monthly_data } = Util();
  return (
    <div className="main-container">
      <Topbar />
      <div className="dashboard-container">
        <QuickSummary />
        <Save
          open={showSaveDialog}
          handleSave={handleSave}
          handleSaveDialog={handleSaveDialog}
        />
        <div className="dashboard-right">
          <h1 className="debt-text">Income history</h1>{" "}
          {loading && <CircularProgress />}
          <Table columns={savingsColumn} rows={savingsList} />
          <h1 className="debt-text">
            Monthly Financial Summary Chart: {new Date().getFullYear()}
          </h1>
          <div className="chart-container">
            {savingsList.reduce((a, b) => a + b.saved, 0) > 0 ? (
              <AreaChartComponents
                data={
                  user?.tier !== "premium" ? dummy_monthly_data : monthly_data
                }
              />
            ) : (
              <h1 className="no-data-text">
                No savings data available to display chart
              </h1>
            )}
            {savingsList?.reduce((a, b) => a + b.saved, 0) > 0 &&
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
      <div className="action-container">
        <div className="add-expenses-btn-container" onClick={handleSaveDialog}>
          <FaHandHoldingDollar className="add-expenses-btn" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
