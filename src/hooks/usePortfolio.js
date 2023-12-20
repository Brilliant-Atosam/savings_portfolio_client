import useApp from "../useApp";
import moment from "moment";
import { useState } from "react";
import Util from "../utils/util";
import useFeedback from "./useFeedback";
import request from "../utils/request";
const usePortfolio = () => {
  const { handleSnackbar } = useFeedback();
  const { storeUser, setConfirmData } = Util();
  const context = useApp();
  let user = JSON.parse(window.localStorage.getItem("user"));
  const [showPortfolioDialog, setShowPortfolioDialog] = useState(false);
  const [showUpdatePortfolioDialog, setShowUpdatePortfolioDialog] =
    useState(false);
  const [newPortfolio, setNewPortfolio] = useState({
    title: "",
    reason: "",
    percentage: "",
    goal: "",
    deadline: "",
    createdAt: moment(new Date()).format("DD/MM/YYYY"),
    amount: 0,
    id: Math.floor(Math.random() * 999).toString(),
  });
  const handlePortfolioDialog = () =>
    setShowPortfolioDialog(!showPortfolioDialog);
  const handleUpdatePortfolioDialog = () =>
    setShowUpdatePortfolioDialog(!showUpdatePortfolioDialog);

  // add new portfolio
  const addPortfolio = async (newPortfolio) => {
    if (
      !newPortfolio.title ||
      !newPortfolio.reason ||
      !newPortfolio.percentage ||
      !newPortfolio.goal ||
      !newPortfolio.deadline ||
      newPortfolio.percentage > 100
    ) {
      handleSnackbar("Provide value for all fields");
      window.alert("Provide value for all fields");
    } else {
      const portfolio = user.portfolio.find(
        (portfolio) =>
          portfolio.title.toLowerCase() === newPortfolio.title.toLowerCase()
      );
      if (portfolio) {
        context?.handleSnackbar("Savings portfolio already exist");
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

          storeUser({ ...user, portfolio: [...user.portfolio, newPortfolio] });
          context?.handleSnackbar(response.data);
          window.location.reload();
        } catch (err) {
          context?.handleSnackbar(err.response.data);
        }
      }
    }
  };

  // delete portfolio
  const deletePortfolio = async (deleteItem) => {
    let portfolio = user.portfolio.filter(
      (item) => item.title !== deleteItem.title
    );
    storeUser({
      ...user,
      portfolio: portfolio,
      total_amount_saved: user.total_amount_saved - deleteItem.amount,
    });
    try {
      const res = await request.put(
        `/user?id=${user.id}`,
        {
          ...user,
          portfolio: portfolio,
          total_amount_saved: user.total_amount_saved - deleteItem.amount,
        },
        { headers: { access_token: `Bearer ${user.access_token}` } }
      );
      context?.handleSnackbar(res.data, "success");
    } catch (err) {
      context?.handleSnackbar(
        err.response ? err.response.data : "Network error",
        "error"
      );
    }
    setConfirmData((prev) => ({ ...prev, open: false }));
  };
  // edit portfolio
  const updatePortfolio = async (newPortfolio) => {
    if (
      !newPortfolio.title ||
      !newPortfolio.reason ||
      !newPortfolio.percentage ||
      !newPortfolio.goal ||
      !newPortfolio.deadline ||
      newPortfolio.percentage > 100
    ) {
      context?.handleSnackbar("Provide value for all fields");
      window.alert("Provide value for all fields");
    } else {
      let { portfolio } = user;
      const index = portfolio.findIndex((item) => item.id === newPortfolio.id);
      alert(index);
      portfolio[index] = newPortfolio;
      user = { ...user, portfolio };
      try {
        const res = await request.put(`/user?id=${user.id}`, user, {
          headers: { access_token: `Bearer ${user.access_token}` },
        });
        context?.handleSnackbar(res.data, "success");
        storeUser(user);
        handleUpdatePortfolioDialog();
      } catch (err) {
        context?.handleSnackbar(
          err.res ? err.response.data : "Network error",
          "error"
        );
      }
    }
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
  };
};

export default usePortfolio;
