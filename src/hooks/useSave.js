import { useState } from "react";
import Util from "../utils/util";
import useApp from "../useApp";
import request from "../utils/request";
import moment from "moment";
const useSave = () => {
  const { storeUser, storeSavings, months } = Util();
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
  // delete income
  const deleteIncome = async (id) => {
    const deleteItem = savingsList.find((item) => item.id === id);
    console.log(deleteItem);
    // remove details of that income from the user's portfolios total amount.

    // const res = await request.delete(`/savings?id=${id}`, {
    //   headers: {
    //     access_token: `Bearer ${user.access_token}`,
    //   },

    // });
  };
  // add income
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
      const updatedPortfolio = portfolio.map((item, index) => {
        if (Number(item.goal) >= item.amount) {
          return { ...item, amount: item.amount + details[index].amount };
        }
        return item;
      });
      const source_exists = user.sources_of_income?.find(
        (source) => source.toLowerCase() === savings.source.toLowerCase()
      );
      user = {
        ...user,
        total_income: user.total_income + Number(savings.amount),
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
  // savings data for monthly charts
  const monthly_savings_data = () => {
    let data = [];
    months.map((month, index) => {
      let data_object = {
        title: month,
        id:
          (index + 1).toString().length === 1
            ? `0${index + 1}`
            : (index + 1).toString(),
        total_amount: savingsList
          ?.filter((item) =>
            item.createdAt.endsWith(
              (index + 1).toString().length === 1
                ? `0${index + 1}/${new Date().getFullYear()}`
                : `${index + 1}/${new Date().getFullYear()}`
            )
          )
          ?.reduce((a, b) => a + b.saved, 0)
          .toFixed(2),
      };
      data.push(data_object);
      return data_object;
    });
    return data;
  };
  let monthly_data = monthly_savings_data();
  return {
    showSaveDialog,
    setShowSaveDialog,
    handleSaveDialog,
    handleSave,
    savings,
    setSavings,
    monthly_data,
    deleteIncome,
  };
};

export default useSave;
