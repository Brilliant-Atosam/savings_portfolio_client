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
import Footer from "../components/Footer";
import Subscription from "../components/Subscription";
import Feedback from "../components/Feedback";
const Dashboard = () => {
  const {
    handleSave,
    handleSaveDialog,
    showSaveDialog,
    monthly_data,
    snackbar,
    handleSnackbar,
  } = useSave();
  const { savingsColumn } = useTableData();
  let { savingsList, loading } = useApp();
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
          <div className="chart-container borrowing-chart-container">
            {
              <AreaChartComponents
                data={
                  monthly_data.reduce((a, b) => a + b.total_income, 0) > 0 &&
                  user?.tier !== "premium"
                    ? dummy_monthly_data
                    : monthly_data
                }
              />
            }
            {savingsList?.reduce((a, b) => a + b.saved, 0) > 0 &&
              user?.tier !== "premium" && (
                <>
                  <h1 className="no-data-text">
                    This could be your data displayed in the chart above if you
                    were subscribed to the premium version.
                  </h1>
                  <Subscription />
                </>
              )}
          </div>
        </div>
      </div>

      <div className="action-container">
        <div className="add-expenses-btn-container" onClick={handleSaveDialog}>
          <FaHandHoldingDollar className="add-expenses-btn" />
        </div>
      </div>
      <Feedback
        snackbar={snackbar}
        toggler={() => handleSnackbar("", "info")}
      />
      <Footer />
    </div>
  );
};

export default Dashboard;
