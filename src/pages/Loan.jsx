import "../styles/loan.css";
import Topbar from "../components/Topbar";
import Table from "../components/Table";
import useTableData from "../utils/tableData";
import useBorrow from "../hooks/useBorrow";
import LoanAreaChartComponent from "../components/LoanAreaChartComponent";
import { GiReceiveMoney } from "react-icons/gi";
import { RiRefund2Fill } from "react-icons/ri";
import BorrowMoneyDialog from "../components/BorrowMoneyDialog";
import SettleAdvanceDialog from "../components/SettleAdvanceDialog";
import Footer from "../components/Footer";
import Util from "../utils/util";
import BorrowDetails from "../components/BorrowDetails";
const Loan = () => {
  const {
    openBorrowDialog,
    handleOpenBorrowDialog,
    borrowMoney,
    handleSettleDialog,
    showSettleDialog,
    borrowedList,
    lentList,
    borrowed_repayment_history,
    lend_repayment_history,
    monthly_lent_data,
    monthly_borrow_data,
  } = useBorrow();
  const { format_currency } = Util();
  const {
    borrowColumn,
    lendColumn,
    toggleBorrowDetails,
    borrowDetailsToggler,
    borrowDetails,
  } = useTableData();
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
      <BorrowDetails
        open={toggleBorrowDetails}
        toggler={borrowDetailsToggler}
        data={borrowDetails}
      />
      <div className="loan-container">
        <div className="loan-left">
          <div className="finance-info-container">
            <h1 className="highlight-title">Borrowed</h1>
            <div className="info-container">
              <span className="finance-info-key">Tot. Debt</span>
              <span className="finance-info-value">
                {format_currency(
                  borrowedList?.reduce((a, b) => a + Number(b.amount), 0)
                )}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Amt. Settled</span>
              <span className="finance-info-value">
                {format_currency(
                  borrowed_repayment_history?.reduce(
                    (a, b) => a + Number(b.amount),
                    0
                  )
                )}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Balance</span>
              <span className="finance-info-value">
                {format_currency(
                  borrowedList?.reduce((a, b) => a + Number(b.amount), 0) -
                    borrowed_repayment_history?.reduce(
                      (a, b) => a + b.amount,
                      0
                    )
                )}
              </span>
            </div>
            <h1 className="highlight-subtitle">
              Lenders:{" "}
              {
                borrowedList?.filter(
                  (item) =>
                    item.amount -
                      item.repayment_history?.reduce(
                        (a, b) => a + b.amount,
                        0
                      ) >
                    1
                )?.length
              }
            </h1>
          </div>
          <div className="borrowed-table-container">
            <h1 className="debt-text">Borrowing History</h1>
            <Table columns={borrowColumn} rows={borrowedList} />
          </div>
          <div className="borrowing-chart-container">
            <h1 className="debt-text">Monthly Borrowing & Repayment Chart</h1>
            <LoanAreaChartComponent data={monthly_borrow_data} />
          </div>
        </div>
        <div className="loan-right">
          <div className="finance-info-container">
            <h1 className="highlight-title">Lent</h1>
            <div className="info-container">
              <span className="finance-info-key">Tot. Debt</span>
              <span className="finance-info-value">
                {format_currency(lentList?.reduce((a, b) => a + b.amount, 0))}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Amt. Settled</span>
              <span className="finance-info-value">
                {format_currency(
                  lend_repayment_history?.reduce((a, b) => a + b.amount, 0)
                )}
              </span>
            </div>
            <div className="info-container">
              <span className="finance-info-key">Balance</span>
              <span className="finance-info-value">
                {format_currency(
                  lentList?.reduce((a, b) => a + b.amount, 0) -
                    lend_repayment_history?.reduce((a, b) => a + b.amount, 0)
                )}
              </span>
            </div>
            <h1 className="highlight-subtitle">
              Borrowers:{" "}
              {
                lentList?.filter(
                  (item) =>
                    item.amount -
                      item.repayment_history?.reduce(
                        (a, b) => a + b.amount,
                        0
                      ) >
                    0
                ).length
              }
            </h1>
          </div>

          <div className="borrowing-chart-container">
            <h1 className="debt-text">Monthly Lending & Repayment Chart</h1>
            <LoanAreaChartComponent data={monthly_lent_data} />
          </div>
          <div className="borrowed-table-container">
            <h1 className="debt-text">Lending History</h1>
            <Table columns={lendColumn} rows={lentList} />
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
