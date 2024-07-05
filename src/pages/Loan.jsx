import "../styles/loan.css";
// import "../styles/dashboard.css";
import Topbar from "../components/Topbar";
import Table from "../components/Table";
import useTableData from "../utils/tableData";
import useBorrow from "../hooks/useBorrow";
import AreaChartComponent from "../components/AreaChartComponent";
import { GiReceiveMoney } from "react-icons/gi";
import { RiRefund2Fill } from "react-icons/ri";
import BorrowMoneyDialog from "../components/BorrowMoneyDialog";
import SettleAdvanceDialog from "../components/SettleAdvanceDialog";
import Footer from "../components/Footer";
import Util from "../utils/util";
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
  const { format_currency } = Util();
  return (
    <div className="main-container">
      <Topbar />
      <BorrowMoneyDialog
        open={openBorrowDialog}
        borrowMoney={borrowMoney}
        handleOpenBorrowDialog={handleOpenBorrowDialog}
      />
      <SettleAdvanceDialog
        open={showSettleDialog}
        toggleDialog={handleSettleDialog}
      />
      <div className="loan-container">
        <div className="loan-left">
          <div className="finance-info-container">
            <h1 className="highlight-title">Borrowed</h1>
            <div className="info-container">
              <span className="finance-info-key">Tot. Debt</span>
              <span className="finance-info-value">{format_currency(111)}</span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Lenders</span>
              <span className="finance-info-value">
                {format_currency(1111)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Balance</span>
              <span className="finance-info-value">{1}%</span>
            </div>
          </div>
          <div className="borrowed-table-container">
            <h1 className="debt-text">Borrowing History</h1>
            <Table columns={loansColumn} rows={loans} />
          </div>
          <div className="borrowing-chart-container">
            <h1 className="debt-text">Monthly Borrowing & Repayment Chart</h1>
            <AreaChartComponent data={monthly_advance_data} />
          </div>
          <div className="borrowed-table-container">
            <h1 className="debt-text">Repayment History</h1>
            <Table columns={loansColumn} rows={loans} />
          </div>
        </div>
        <div className="loan-right">
          <div className="finance-info-container">
            <h1 className="highlight-title">Lent</h1>
            <div className="info-container">
              <span className="finance-info-value">{format_currency(111)}</span>
              <span className="finance-info-key">Tot. Debt</span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Borrowers</span>
              <span className="finance-info-value">
                {format_currency(1111)}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Balance</span>
              <span className="finance-info-value">{1}%</span>
            </div>
          </div>

          <div className="borrowing-chart-container">
            <h1 className="debt-text">Monthly Lending & Repayment Chart</h1>
            <AreaChartComponent data={monthly_advance_data} />
          </div>
          <div className="borrowed-table-container">
            <h1 className="debt-text">Lending History</h1>
            <Table columns={loansColumn} rows={loans} />
          </div>
          <div className="borrowed-table-container">
            <h1 className="debt-text">Repayment History</h1>
            <Table columns={loansColumn} rows={loans} />
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
      <Footer />
    </div>
  );
};

export default Loan;
