import useApp from "../useApp";
import moment from "moment";
import { useState } from "react";
import Util from "../utils/util";
import request from "../utils/request";
const usePortfolio = () => {
  const { storeUser, setConfirmData } = Util();
  const context = useApp();
  let user = JSON.parse(window.localStorage.getItem("user"));
  const [showPortfolioDialog, setShowPortfolioDialog] = useState(false);
  const [showUpdatePortfolioDialog, setShowUpdatePortfolioDialog] =
    useState(false);
  const [portfolio, setPortfolio] = useState(null);
  const handleSetPortfolio = (data) => setPortfolio(data);
  const [newPortfolio, setNewPortfolio] = useState({
    title: "",
    reason: "",
    percentage: "",
    goal: "",
    deadline: "",
    createdAt: moment(new Date()).format("DD/MM/YYYY"),
    id: Math.floor(Math.random() * 999).toString(),
    archived: false,
  });
  const handlePortfolioDialog = () =>
    setShowPortfolioDialog(!showPortfolioDialog);
  const handleUpdatePortfolioDialog = () =>
    setShowUpdatePortfolioDialog(!showUpdatePortfolioDialog);

  // toggle portfolio info
  const [open_portfolio_info, set_open_portfolio_info] = useState(false);
  const handle_toggle_portfolio_info = () =>
    set_open_portfolio_info(!open_portfolio_info);
  // add new portfolio

  const addPortfolio = async (newPortfolio) => {
    context.handleLoader();
    if (
      !newPortfolio.title ||
      !newPortfolio.reason ||
      !newPortfolio.percentage ||
      !newPortfolio.goal ||
      !newPortfolio.deadline ||
      newPortfolio.percentage > 100
    ) {
      context?.handleSnackbar("Provide value for all fields", "warning");
    } else if (
      Number(user?.total_percentage) + Number(newPortfolio.percentage) >
      100
    ) {
      context?.handleSnackbar(
        "You cannot save more than you earned!",
        "warning"
      );
    } else if (user?.tier !== "premium" && user?.portfolio.length >= 3) {
      context?.handleSnackbar(
        "Basic tier users cannot have more than 3 portfolios. Upgrade to premium to enjoy premium features",
        "warning"
      );
    } else {
      const portfolio = user.portfolio.find(
        (portfolio) =>
          portfolio.title.toLowerCase() === newPortfolio.title.toLowerCase()
      );
      if (portfolio) {
        context?.handleSnackbar("Savings portfolio already exist", "warning");
      } else {
        try {
          const response = await request.put(
            `/user/portfolio/add?id=${user.id}`,
            newPortfolio,
            {
              headers: {
                access_token: `Bearer ${user?.access_token}`,
              },
            }
          );
          storeUser({
            ...user,
            portfolio: [...user.portfolio, newPortfolio],
            total_percentage:
              Number(user.total_percentage) + Number(newPortfolio.percentage),
          });
          context?.handleSnackbar(response.data, "success");
          context?.handlePortfolioDialog();
          setNewPortfolio({
            title: "",
            reason: "",
            percentage: "",
            goal: "",
            deadline: "",
            createdAt: moment(new Date()).format("DD/MM/YYYY"),
            id: Math.floor(Math.random() * 999).toString(),
          });
          // window.location.reload();
        } catch (err) {
          context?.handleSnackbar(
            err.response ? err.response.data : "Network error",
            "error"
          );
        }
      }
    }
    context.handleLoader();
  };

  // delete portfolio - now to send portfolio to archives
  const deletePortfolio = async (deleteItem) => {
    context.handleLoader();
    let portfolio = user.portfolio.filter(
      (item) => item.title !== deleteItem.title
    );
    let archived_portfolio = user.portfolio.find(
      (item) => item.title === deleteItem.title
    );
    try {
      user = {
        ...user,
        portfolio: [
          ...portfolio,
          {
            ...archived_portfolio,
            archived: !archived_portfolio.archived,
          },
        ],
      };
      const res = await request.put(
        `/user/portfolio?id=${user.id}`,
        [
          ...portfolio,
          {
            ...archived_portfolio,
            archived: !archived_portfolio.archived,
          },
        ],
        {
          headers: { access_token: `Bearer ${user.access_token}` },
        }
      );
      context?.handleSnackbar(res.data, "success");
      storeUser(user);
      context.setConfirmData((prev) => ({ ...prev, open: false }));
    } catch (err) {
      context?.handleSnackbar(
        err.response ? err.response.data : "Network error",
        "error"
      );
    }
    setConfirmData((prev) => ({ ...prev, open: false }));
    context.handleLoader();
  };

  // edit portfolio
  const updatePortfolio = async (newPortfolio) => {
    context.handleLoader();
    if (
      !newPortfolio.title ||
      !newPortfolio.reason ||
      !newPortfolio.percentage ||
      !newPortfolio.goal ||
      !newPortfolio.deadline ||
      newPortfolio.percentage > 100
    ) {
      context?.handleSnackbar("Provide value for all fields", "warning");
    } else {
      let { portfolio } = user;
      const index = portfolio.findIndex((item) => item.id === newPortfolio.id);
      portfolio[index] = newPortfolio;
      user = { ...user, portfolio };
      try {
        const res = await request.put(
          `/user/portfolio?id=${user.id}`,
          portfolio,
          {
            headers: { access_token: `Bearer ${user.access_token}` },
          }
        );
        handleUpdatePortfolioDialog();
        context?.handleSnackbar(res.data, "success");
        storeUser(user);
      } catch (err) {
        context?.handleSnackbar(
          err.res ? err.response.data : "Network error",
          "error"
        );
      }
    }
    context.handleLoader();
  };
  return {
    showPortfolioDialog,
    setShowPortfolioDialog,
    handlePortfolioDialog,
    newPortfolio,
    setNewPortfolio,
    addPortfolio,
    deletePortfolio,
    showUpdatePortfolioDialog,
    setShowUpdatePortfolioDialog,
    handleUpdatePortfolioDialog,
    updatePortfolio,
    open_portfolio_info,
    handle_toggle_portfolio_info,
    portfolio,
    handleSetPortfolio,
  };
};

export default usePortfolio;
