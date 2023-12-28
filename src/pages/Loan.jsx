import "../styles/dashboard.css";
import Topbar from "../components/Topbar";
import Table from "../components/Table";
import QuickSummary from "../components/QuickSummary";
import { loansColumn } from "../utils/tableData";
import useBorrow from "../hooks/useBorrow";
import AreaChartComponent from "../components/AreaChartComponent";
const Loan = () => {
  let loans = JSON.parse(localStorage.getItem("loans"));
  const { monthly_advance_data } = useBorrow();
  return (
    <div className="main-container">
      <Topbar />
      <div className="dashboard-container">
        <QuickSummary />
        <div className="dashboard-right">
          <h1 className="debt-text">Loan history</h1>
          <Table columns={loansColumn} rows={loans} />
          <div className="chart-container">
            <h1 className="debt-text">Advance chart</h1>
            <AreaChartComponent data={monthly_advance_data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loan;
