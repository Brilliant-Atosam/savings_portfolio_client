import { useMemo, useState } from "react";
import Util from "../utils/util";
import useApp from "../useApp";
import request from "../utils/request";
import moment from "moment";
import useFeedback from "./useFeedback";
const useSave = () => {
  const context = useApp();
  let user = JSON.parse(window.localStorage.getItem("user"));
  let expensesList = JSON.parse(localStorage.getItem("expenses"));
  let loans = JSON.parse(localStorage.getItem("loans"));
  const { storeUser, storeSavings, months, headers } = Util();
  const { snackbar, handleSnackbar } = useFeedback();
  const years_spent_on_cashlens = useMemo(() => {
    if (!user?.notifications?.length) return [];
    let data = [new Date().getFullYear()];
    let years =
      new Date().getFullYear() -
      Number(
        user?.notifications[user.notifications.length - 1].title.split("/")[1]
      );
    for (let i = years; i >= 1; i--) {
      data.push(new Date().getFullYear() - i);
    }
    return data;
  }, [user?.notifications]);

  let [year, setYear] = useState(years_spent_on_cashlens[0]);
  const handleYear = (year) => setYear(year);
  console.log(year);

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
  const spendable_percentage =
    100 -
    user?.portfolio
      ?.filter((item) => !item.archived)
      .reduce((a, b) => a + Number(b.percentage), 0);
  // portfolio data for quick summary
  let portfolio_from_savings = [];
  savingsList?.map((item) => {
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

  // delete income
  const deleteIncome = async (id) => {
    context.handleLoader();
    savingsList = savingsList.filter((item) => item.id !== id);
    try {
      const res = await request.delete(`/savings?id=${id}`, {
        headers,
      });
      handleSnackbar(res?.data, "success");
      storeSavings(savingsList);
    } catch (err) {
      handleSnackbar(
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
      handleSnackbar("Please provide valid info for all fields.", "warning");
      context.handleLoader();
    } else {
      const { details } = savings;

      const source_exists = user.sources_of_income?.find(
        (source) => source.toLowerCase() === savings.source.toLowerCase()
      );
      user = {
        ...user,
        sources_of_income: user.sources_of_income || [],
      };
      !source_exists && user.sources_of_income.push(savings.source);
      try {
        const res = await request.post(
          `/savings?userId=${user.id}`,
          { savings, user },
          {
            headers,
          }
        );
        storeSavings([savings, ...savingsList]);
        storeUser(user);
        handleSaveDialog();
        handleSnackbar(res?.data, "success");
        setSavings({
          source: "",
          amount: "",
          createdAt: moment(new Date()).format("DD/MM/YYYY"),
          id: Math.floor(Math.random() * 9999).toFixed(),
          userId: user?.id,
          details,
        });
      } catch (err) {
        handleSnackbar(
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
        title: `${month},${year}`,
        id:
          (index + 1).toString().length === 1
            ? `0${index + 1}`
            : (index + 1).toString(),
        total_savings: Number(
          savingsList
            ?.filter((item) =>
              item.createdAt.endsWith(
                (index + 1).toString().length === 1
                  ? `0${index + 1}/${year}`
                  : `${index + 1}/${year}`
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
                  ? `0${index + 1}/${year}`
                  : `${index + 1}/${year}`
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
                  ? `0${index + 1}/${year}`
                  : `${index + 1}/${year}`
              )
            )
            ?.reduce((a, b) => a + b.total_cost, 0)
            .toFixed(2)
        ),
        total_advance: Number(
          loans
            ?.filter((item) =>
              item.createdAt.endsWith(
                (index + 1).toString().length === 1
                  ? `0${index + 1}/${year}`
                  : `${index + 1}/${year}`
              )
            )
            ?.reduce((a, b) => a + b.amount, 0)
            .toFixed(2)
        ),
        spendable_amount: Number(
          savingsList
            ?.filter((item) =>
              item.createdAt.endsWith(
                (index + 1).toString().length === 1
                  ? `0${index + 1}/${year}`
                  : `${index + 1}/${year}`
              )
            )
            ?.reduce((a, b) => a + b.balance, 0)
            .toFixed(2)
        ),
      };
      data.push(data_object);
      return data_object;
    });
    return data;
  };
  // set year for chart display
  let monthly_data = monthly_savings_data();
  // console.log(monthly_data);

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
    spendable_percentage,
    user,
    snackbar,
    handleSnackbar,
    years_spent_on_cashlens,
    handleYear,
  };
};

export default useSave;
