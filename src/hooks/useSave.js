import { useState } from "react";
import Util from "../utils/util";
import useApp from "../useApp";
import request from "../utils/request";
import moment from "moment";
const useSave = () => {
  const { storeUser, storeSavings } = Util();
  const context = useApp();
  let user = JSON.parse(window.localStorage.getItem("user"));
  let details = [];
  const [savings, setSavings] = useState({
    source: "",
    amount: "",
    createdAt: moment(new Date()).format("DD/MM/YYYY"),
    id: Math.floor(Math.random() * 9999).toFixed(),
    userId: user?.id,
    details,
  });
  let savingsList = JSON.parse(window.localStorage.getItem("savings")) || [];
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleSaveDialog = () => setShowSaveDialog((prev) => !prev);

  const handleSave = async (savings) => {
    context.handleLoader();
    if (user.portfolio.length < 1) {
      context?.handleSnackbar(
        "You cannot save without a portfolio. Create one now to continue",
        "warning"
      );
      context.handleLoader();
    } else if (!savings.amount || !savings.source) {
      context?.handleSnackbar(
        "Please provide valid info for all fields.",
        "warning"
      );
      context.handleLoader();
    } else {
      const { details } = savings;
      let { portfolio } = user;
      const updatedPortfolio = portfolio.map((item, index) => {
        if (Number(item.goal) >= item.amount) {
          return { ...item, amount: item.amount + details[index].amount };
        }
        return item;
      });
      console.log(updatedPortfolio);
      const source_exists = user.sources_of_income?.find(
        (source) => source.toLowerCase() === savings.source.toLowerCase()
      );
      user = {
        ...user,
        portfolio: updatedPortfolio,
        total_amount_saved: (
          Number(user.total_amount_saved) + savings?.saved
        ).toFixed(2),
        sources_of_income: user.sources_of_income || [],
      };
      !source_exists && user.sources_of_income.push(savings.source);
      try {
        const res = await request.post(
          `/savings?userId=${user.id}`,
          { savings, user },
          {
            headers: {
              access_token: `Bearer ${user?.access_token}`,
            },
          }
        );
        storeSavings([savings, ...savingsList]);
        storeUser(user);
        handleSaveDialog();
        context?.handleSnackbar(res?.data, "success");
        setSavings({
          source: "",
          amount: "",
          createdAt: moment(new Date()).format("DD/MM/YYYY"),
          id: Math.floor(Math.random() * 9999).toFixed(),
          userId: user?.id,
          details,
        });
      } catch (err) {
        context?.handleSnackbar(
          err.response ? err.response.data : "Network error!",
          "error"
        );
      }
      context.handleLoader();
    }
  };
  return {
    showSaveDialog,
    setShowSaveDialog,
    handleSaveDialog,
    handleSave,
    savings,
    setSavings,
  };
};

export default useSave;
