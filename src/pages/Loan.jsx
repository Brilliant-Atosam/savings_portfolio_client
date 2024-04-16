import "../styles/dashboard.css";
import Topbar from "../components/Topbar";
import Table from "../components/Table";
import QuickSummary from "../components/QuickSummary";
import useTableData from "../utils/tableData";
import useBorrow from "../hooks/useBorrow";
import AreaChartComponent from "../components/AreaChartComponent";
import { GiReceiveMoney } from "react-icons/gi";
import { RiRefund2Fill } from "react-icons/ri";
import BorrowMoneyDialog from "../components/BorrowMoneyDialog";
import SettleAdvanceDialog from "../components/SettleAdvanceDialog";
const Loan = () => {
  const { loansColumn } = useTableData();
  let loans = JSON.parse(localStorage.getItem("loans"));
  const {
    monthly_advance_data,
    openBorrowDialog,
    handleOpenBorrowDialog,
    borrowMoney,
    handleSettleDialog,
    showSettleDialog,
  } = useBorrow();
  return (
    <div className="main-container">
      <Topbar />
      <div className="dashboard-container">
        <QuickSummary />
        <BorrowMoneyDialog
          open={openBorrowDialog}
          borrowMoney={borrowMoney}
          handleOpenBorrowDialog={handleOpenBorrowDialog}
        />
        <SettleAdvanceDialog
          open={showSettleDialog}
          toggleDialog={handleSettleDialog}
        />
        <div className="dashboard-right">
          <h1 className="debt-text">Loan history</h1>
          <Table columns={loansColumn} rows={loans} />
          <div className="chart-container">
            <h1 className="debt-text">Advance chart</h1>
            <AreaChartComponent data={monthly_advance_data} />
          </div>
        </div>
      </div>
      <div className="action-container loan-action-container">
        <div
          className="add-expenses-btn-container"
          onClick={handleOpenBorrowDialog}
        >
          <GiReceiveMoney className="add-expenses-btn" />
        </div>
        <div
          className="add-expenses-btn-container"
          onClick={handleSettleDialog}
        >
          <RiRefund2Fill className="add-expenses-btn" />
        </div>
      </div>
    </div>
  );
};

export default Loan;
