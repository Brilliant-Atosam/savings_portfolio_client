import "../styles/dashboard.css";
import Topbar from "../components/Topbar";
import Table from "../components/Table";
import QuickSummary from "../components/QuickSummary";
import { loansColumn } from "../utils/tableData";
const Loan = () => {
  let loans = JSON.parse(localStorage.getItem("loans"));
  return (
    <div className="main-container">
      <Topbar />
      <div className="dashboard-container">
        <QuickSummary />
        <div className="dashboard-right">
          <h1 className="debt-text">Loan history</h1>
          <Table columns={loansColumn} rows={loans} />
        </div>
      </div>
    </div>
  );
};

export default Loan;
