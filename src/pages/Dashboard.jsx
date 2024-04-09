import "../styles/dashboard.css";
import Topbar from "../components/Topbar";
import Table from "../components/Table";
import QuickSummary from "../components/QuickSummary";
import AreaChartComponents from "../components/AreaChartComponent";
import useApp from "../useApp";
import { CircularProgress } from "@mui/material";
import useTableData from "../utils/tableData";
import useSave from "../hooks/useSave";
const Dashboard = () => {
  const { savingsColumn } = useTableData();
  let { savingsList, loading } = useApp();
  const { monthly_data } = useSave();
  console.log(monthly_data);
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
            <AreaChartComponents data={monthly_data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
