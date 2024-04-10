import { useState } from "react";
import Util from "../utils/util";
import useApp from "../useApp";
import request from "../utils/request";
import moment from "moment";
const useSave = () => {
  const { storeUser, storeSavings, months } = Util();
  const context = useApp();
  let user = JSON.parse(window.localStorage.getItem("user"));
  let expensesList = JSON.parse(localStorage.getItem("expenses"));
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
  // portfolio data for quick summary
  let portfolio_from_savings = [];
  savingsList.map((item) => {
    return portfolio_from_savings.push(...item.details);
  });
  const structuredPortfolio = user?.portfolio?.map((item) => ({
    ...item,
    amount: Number(
      parseFloat(
        portfolio_from_savings
          .filter((port) => port.title === item.title)
          .reduce((a, b) => a + b.amount, 0)
      ).toFixed(2)
    ),
  }));
  const handleSaveDialog = () => setShowSaveDialog((prev) => !prev);
  // delete income
  const deleteIncome = async (id) => {
    context.handleLoader();
    savingsList = savingsList.filter((item) => item.id !== id);
    try {
      const res = await request.delete(`/savings?id=${id}`, {
        headers: {
          access_token: `Bearer ${user?.access_token}`,
        },
      });
      context?.handleSnackbar(res?.data, "success");
      storeSavings(savingsList);
    } catch (err) {
      context?.handleSnackbar(
        err.response ? err.response.data : "Network error!",
        "error"
      );
    }
    context.handleLoader();
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
        total_savings: Number(
          savingsList
            ?.filter((item) =>
              item.createdAt.endsWith(
                (index + 1).toString().length === 1
                  ? `0${index + 1}/${new Date().getFullYear()}`
                  : `${index + 1}/${new Date().getFullYear()}`
              )
            )
            ?.reduce((a, b) => a + b.saved, 0)
            .toFixed(2)
        ),
        total_income: Number(
          savingsList
            ?.filter((item) =>
              item.createdAt.endsWith(
                (index + 1).toString().length === 1
                  ? `0${index + 1}/${new Date().getFullYear()}`
                  : `${index + 1}/${new Date().getFullYear()}`
              )
            )
            ?.reduce((a, b) => a + b.amount, 0)
            .toFixed(2)
        ),
        total_expenses: Number(
          expensesList
            ?.filter((item) =>
              item.created_at.endsWith(
                (index + 1).toString().length === 1
                  ? `0${index + 1}/${new Date().getFullYear()}`
                  : `${index + 1}/${new Date().getFullYear()}`
              )
            )
            ?.reduce((a, b) => a + b.total_cost, 0)
            .toFixed(2)
        ),
      };
      data.push(data_object);
      return data_object;
    });
    return data;
  };
  let monthly_data = monthly_savings_data();
  console.log(monthly_data);
  return {
    showSaveDialog,
    setShowSaveDialog,
    handleSaveDialog,
    handleSave,
    savings,
    setSavings,
    monthly_data,
    deleteIncome,
    savingsList,
    portfolio_from_savings,
    structuredPortfolio,
  };
};

export default useSave;
