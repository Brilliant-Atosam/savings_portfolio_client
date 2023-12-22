import { useState } from "react";
import Util from "../utils/util";
import useApp from "../useApp";
import useFeedback from "./useFeedback";
import request from "../utils/request";
const useSave = () => {
  const { storeUser, storeSavings } = Util();
  const { handleSnackbar } = useFeedback();
  const context = useApp();
  let user = JSON.parse(window.localStorage.getItem("user"));

  let savingsList = JSON.parse(window.localStorage.getItem("savings")) || [];
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleSaveDialog = () => setShowSaveDialog((prev) => !prev);

  const handleSave = async (savings) => {
    context.handleLoader();
    if (!savings.amount || !savings.source) {
      context?.handleSnackbar(
        "Please provide valid info for all fields.",
        "warning"
      );
      context.handleLoader();
    } else {
      const { details } = savings;
      let { portfolio } = user;
      const updatedPortfolio = portfolio.map((item, index) => ({
        ...item,
        amount: item?.amount + details[index].amount,
      }));
      user = {
        ...user,
        portfolio: updatedPortfolio,
        total_amount_saved: user.total_amount_saved + savings?.saved,
      };

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
        storeSavings([...savingsList, savings]);
        storeUser(user);
        handleSaveDialog();
        context?.handleSnackbar(res?.data, "success");
        // window.location.reload();
      } catch (err) {
        context?.handleSnackbar(
          err.response ? err.response.data : "Network error!",
          "error"
        );
        // window.alert(err.response ? err.response.data : "Network error!");
      }
      context.handleLoader();
    }
  };
  return { showSaveDialog, setShowSaveDialog, handleSaveDialog, handleSave };
};

export default useSave;
