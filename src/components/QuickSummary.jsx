import React from "react";
import {
  EditOutlined,
  ArchiveOutlined,
  Restore,
  VisibilityOutlined,
  EmojiEventsOutlined,
  HourglassBottomOutlined,
} from "@mui/icons-material";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { BsDatabaseFillAdd } from "react-icons/bs";
import useApp from "../useApp";
import useSave from "../hooks/useSave";
import usePortfolio from "../hooks/usePortfolio";
import UpdatePortfolioDialog from "./UpdatePortfolioDialog";
import PieChartComponent from "./PieChartComponent";
import Util from "../utils/util";
import moment from "moment";
import PortfolioInfo from "./PortfolioInfo";
import Save from "./Save";
import AddPortfolioDialog from "./AddPortfolioDialog";
import useSettings from "../hooks/useSettings";
const QuickSummary = () => {
  const { user, setConfirmData, colors, savingsList } = useApp();
  const { total_savings, savings_efficiency, actual_savings } = useSettings();
  const { format_currency, piechart_data } = Util();
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
    handlePortfolioDialog,
    showPortfolioDialog,
    // handlePortfolioDialog,
    addPortfolio,
  } = usePortfolio();
  const { structuredPortfolio, handleSaveDialog, showSaveDialog, handleSave } =
    useSave();
  console.log(structuredPortfolio);
  return (
    <>
      <AddPortfolioDialog
        open={showPortfolioDialog}
        close={handlePortfolioDialog}
        action={addPortfolio}
      />
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
      <Save
        open={showSaveDialog}
        handleSaveDialog={handleSaveDialog}
        handleSave={handleSave}
      />
      <div className="dashboard-left">
        <div className="finance-info-container">
          <div className="info-container">
            <span className="finance-info-key">Gross Savings</span>
            <span className="finance-info-value">
              {format_currency(total_savings)}
            </span>
          </div>
          <div className="info-container">
            <span className="finance-info-key">Net Savings</span>
            <span className="finance-info-value">
              {format_currency(actual_savings)}
            </span>
          </div>
          <div className="info-container">
            <span className="finance-info-key">Efficiency</span>
            <span className="finance-info-value">{savings_efficiency}%</span>
          </div>
        </div>
        <div className="chart-container quick-chart">
          {structuredPortfolio
            ?.filter((item) => !item.archived)
            .reduce((a, b) => a + b.amount, 0) > 0 ? (
            <PieChartComponent
              colors={colors}
              portfolio={
                user?.tier !== "premium"
                  ? piechart_data
                  : structuredPortfolio.filter((item) => !item.archived)
              }
            />
          ) : (
            <>
              <h1 className="no-data-text">
                No savings data available to display chart
              </h1>
              <button
                className="dashboard-action-btn"
                onClick={handleSaveDialog}
              >
                <FaHandHoldingDollar className="action-icon" />
                add income
              </button>
            </>
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
                    {moment(new Date(), "DD/MM/YYYY").isAfter(
                      moment(item?.deadline, "DD/MM/YYYY")
                    ) && <HourglassBottomOutlined className="achieved" />}
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
            <div className="no-data-container">
              <h1 className="no-data-text">
                You have no active savings portfolios.
              </h1>
              <button
                className="dashboard-action-btn"
                onClick={handlePortfolioDialog}
              >
                <BsDatabaseFillAdd fill="teal" className="action-icon" />
                create portfolio
              </button>
            </div>
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
      </div>
    </>
  );
};

export default QuickSummary;
