import React from "react";
import {
  EditOutlined,
  DeleteOutlineOutlined,
  VerifiedOutlined,
} from "@mui/icons-material";
import useApp from "../useApp";
import useSave from "../hooks/useSave";
import useBorrow from "../hooks/useBorrow";
import usePortfolio from "../hooks/usePortfolio";
import UpdatePortfolioDialog from "./UpdatePortfolioDialog";
import SettleAdvanceDialog from "./SettleAdvanceDialog";
import BorrowMoneyDialog from "./BorrowMoneyDialog";
import Save from "./Save";
import PieChartComponent from "./PieChartComponent";
import Util from "../utils/util";
const QuickSummary = () => {
  const { user, setConfirmData, colors } = useApp();
  const { format_currency } = Util();
  const {
    setNewPortfolio,
    newPortfolio,
    handleUpdatePortfolioDialog,
    showUpdatePortfolioDialog,
    updatePortfolio,
  } = usePortfolio();
  const {
    showSettleDialog,
    handleSettleDialog,
    openBorrowDialog,
    borrowMoney,
    handleOpenBorrowDialog,
  } = useBorrow();
  const { handleSave, handleSaveDialog, showSaveDialog } = useSave();
  const structuredPortfolio = user?.portfolio?.map((item) => ({
    ...item,
    amount: Number(parseFloat(item.amount).toFixed(2)),
  }));
  return (
    <>
      <UpdatePortfolioDialog
        open={showUpdatePortfolioDialog}
        newPortfolio={newPortfolio}
        setNewPortfolio={setNewPortfolio}
        updatePortfolio={updatePortfolio}
        toggleDialog={handleUpdatePortfolioDialog}
      />
      <SettleAdvanceDialog
        open={showSettleDialog}
        toggleDialog={handleSettleDialog}
      />
      <BorrowMoneyDialog
        open={openBorrowDialog}
        borrowMoney={borrowMoney}
        handleOpenBorrowDialog={handleOpenBorrowDialog}
      />

      <Save
        open={showSaveDialog}
        handleSave={handleSave}
        handleSaveDialog={handleSaveDialog}
      />
      <div className="dashboard-left">
        <div className="dashboard-actions-container">
          <button className="dashboard-action-btn" onClick={handleSaveDialog}>
            add income
          </button>
          <button onClick={handleSettleDialog} className="dashboard-action-btn">
            settle loan
          </button>
          <button
            className="dashboard-action-btn"
            onClick={handleOpenBorrowDialog}
          >
            take a loan
          </button>
        </div>
        {user.total_amount_saved > 0 ? (
          <PieChartComponent colors={colors} portfolio={structuredPortfolio} />
        ) : (
          <h1 className="no-data-text">No savings done yet</h1>
        )}
        <div className="savings-portfolios-container">
          <h1 className="debt-text">Savings summary</h1>
          {structuredPortfolio.length > 0
            ? structuredPortfolio?.map((item, index) => (
                <div className="portfolio" key={index}>
                  <div className="portfolio-action-container">
                    <DeleteOutlineOutlined
                      className="portfolio-action-icon delete-icon"
                      style={{ fill: "#cc0052" }}
                      onClick={() => {
                        setConfirmData((prev) => ({
                          ...prev,
                          open: !prev.open,
                          heading: "Delete portfolio",
                          warning: `This action will delete your savings portfolio '${item.title}'. Do you wish to continue?`,
                          item: item,
                        }));
                      }}
                    />
                    <EditOutlined
                      style={{ fill: colors[index] }}
                      className="portfolio-action-icon"
                      onClick={async () => {
                        await setNewPortfolio((prev) => ({ ...prev, ...item }));
                        await handleUpdatePortfolioDialog();
                      }}
                    />
                    <span
                      style={{ color: `${colors[index]}` }}
                      className="portfolio-title"
                    >
                      {item?.title}({item?.percentage}%)
                    </span>
                    {Number(item?.goal) <= item?.amount && <VerifiedOutlined />}
                  </div>
                  <span
                    className="portfolio-value"
                    style={{ color: [colors[index]] }}
                  >
                    {format_currency(item?.amount)}
                  </span>
                </div>
              ))
            : "You have no portfolios yet"}
          {}
        </div>
        <div className="debt-container">
          <h1 className="debt-text">Debt</h1>
          <div className="debt-item-container">
            <span className="debt-key">Total debt: </span>
            <span className="debt-value">{user.total_advance}</span>
          </div>
          <div className="debt-item-container">
            <span className="debt-key">Total repayment: </span>
            <span className="debt-value">{user.settled_advance}</span>
          </div>
          <div className="debt-item-container">
            <span className="debt-key">Advance Balance: </span>
            <span className="debt-value">
              {user.total_advance - user.settled_advance}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickSummary;
