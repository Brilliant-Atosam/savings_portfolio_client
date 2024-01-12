import React from "react";
import {
  EditOutlined,
  ArchiveOutlined,
  Restore,
  VisibilityOutlined,
  EmojiEventsOutlined,
  HourglassBottomOutlined,
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
import moment from "moment";
import PortfolioInfo from "./PortfolioInfo";
const QuickSummary = () => {
  const { user, setConfirmData, colors } = useApp();
  const { format_currency } = Util();
  const {
    setNewPortfolio,
    newPortfolio,
    handleUpdatePortfolioDialog,
    showUpdatePortfolioDialog,
    updatePortfolio,
    open_portfolio_info,
    handle_toggle_portfolio_info,
    portfolio,
    handleSetPortfolio,
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
      <PortfolioInfo
        open={open_portfolio_info}
        toggler={handle_toggle_portfolio_info}
        data={portfolio}
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
            Add income
          </button>
          <button onClick={handleSettleDialog} className="dashboard-action-btn">
            Settle loan
          </button>
          <button
            className="dashboard-action-btn"
            onClick={handleOpenBorrowDialog}
          >
            Take a loan
          </button>
        </div>
        {user.portfolio
          .filter((item) => !item.archived)
          .reduce((a, b) => a + b.amount, 0) > 0 ? (
          <PieChartComponent
            colors={colors}
            portfolio={structuredPortfolio.filter((item) => !item.archived)}
          />
        ) : (
          <h1 className="no-data-text">No savings data to display chart</h1>
        )}
        <div className="savings-portfolios-container">
          <h1 className="debt-text">Active savings portfolio</h1>
          {structuredPortfolio.filter((item) => !item.archived).length > 0 ? (
            structuredPortfolio
              .filter((item) => !item.archived)
              ?.map((item, index) => (
                <div className="portfolio" key={index}>
                  <div className="portfolio-action-container">
                    <ArchiveOutlined
                      className="portfolio-action-icon delete-icon"
                      style={{ fill: "#cc0052" }}
                      onClick={() => {
                        setConfirmData((prev) => ({
                          ...prev,
                          open: !prev.open,
                          heading: "Archive portfolio",
                          warning: `This action will send your savings portfolio '${item.title}' to archives. Do you wish to continue?`,
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
                    <VisibilityOutlined
                      onClick={() => {
                        handleSetPortfolio(item);
                        handle_toggle_portfolio_info();
                      }}
                      className="portfolio-action-icon"
                    />
                    <span
                      style={{ color: `${colors[index]}` }}
                      className="portfolio-title"
                    >
                      {item?.title}({item?.percentage}%)
                    </span>
                    {Number(item?.goal) <= item?.amount && (
                      <EmojiEventsOutlined className="achieved" />
                    )}
                    {moment(item?.deadline)
                      .isBefore(moment().format("DD/MM/YYYY")) <=
                      item?.amount && (
                      <HourglassBottomOutlined className="achieved" />
                    )}
                  </div>
                  <span
                    className="portfolio-value"
                    style={{ color: [colors[index]] }}
                  >
                    {format_currency(item?.amount)}
                  </span>
                </div>
              ))
          ) : (
            <h1 className="no-data-text">
              You have no active savings portfolios.
            </h1>
          )}
        </div>
        <div className="savings-portfolios-container">
          <h1 className="debt-text">Archived savings portfolio</h1>
          {structuredPortfolio.filter((item) => item.archived).length > 0 ? (
            structuredPortfolio
              .filter((item) => item.archived)
              ?.map((item, index) => (
                <div className="portfolio" key={index}>
                  <div className="portfolio-action-container">
                    <Restore
                      className="portfolio-action-icon"
                      onClick={() => {
                        setConfirmData((prev) => ({
                          ...prev,
                          open: !prev.open,
                          heading: "Restore this portfolio",
                          warning: `This action will restore your savings portfolio '${item.title}'. Do you wish to continue?`,
                          item: item,
                        }));
                      }}
                    />
                    <span className="portfolio-title">
                      {item?.title}({item?.percentage}%)
                      {Number(item?.goal) <= item?.amount && (
                        <EmojiEventsOutlined className="achieved" />
                      )}
                    </span>
                  </div>
                  <span className="portfolio-value">
                    {format_currency(item?.amount)}
                  </span>
                </div>
              ))
          ) : (
            <h1 className="no-data-text">You have no archived portfolio.</h1>
          )}
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
