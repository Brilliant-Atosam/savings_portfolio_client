import { useState } from "react";
import useApp from "../useApp";
import request from "../utils/request";
import Util from "../utils/util";
import useSave from "./useSave";
const useSettings = () => {
  const context = useApp();
  let user = JSON.parse(localStorage.getItem("user"));
  let borrowedList = JSON.parse(localStorage.getItem("borrowed"));
  let lentList = JSON.parse(localStorage.getItem("lent"));
  let expensesList = JSON.parse(localStorage.getItem("expenses"));
  let savingsList = JSON.parse(window.localStorage.getItem("savings")) || [];

  const { storeUser, headers, months, colors } = Util();
  const current_year = Number(new Date().getFullYear());
  const year_joined = Number(user?.createdAt.split("/")[2]);
  const past_years = Array.from(
    { length: current_year - year_joined + 1 },
    (_, index) => year_joined + index
  );
  const formattedDates = past_years.flatMap((year) => {
    return months.map((_, index) => {
      const monthNumber = String(index + 1).padStart(2, "0");
      return `${monthNumber}/${year}`;
    });
  });
  const { structuredPortfolio } = useSave();
  const radar_chart_data = structuredPortfolio?.map((item, index) => ({
    name: item.title,
    fill: colors[index],
    amount: item.amount,
    goal: Number(item.goal),
    deadline: item.deadline,
    created_at: item.createdAt,
    progress: ((item.amount / item.goal) * 100).toFixed(2),
  }));
  let borrowed_repayment_history = [];
  borrowedList?.map((item) =>
    borrowed_repayment_history.push(...item?.repayment_history)
  );
  let lend_repayment_history = [];
  lentList?.map((item) =>
    lend_repayment_history.push(...item?.repayment_history)
  );
  const portfolio = user?.portfolio;
  let savings = JSON.parse(localStorage.getItem("savings"));
  let expenses = JSON.parse(localStorage.getItem("expenses"));
  let loans = JSON.parse(localStorage.getItem("loans"));
  const [openPass, setOpenPass] = useState(false);
  const handleOpenPass = () => setOpenPass(!openPass);
  //   password info
  const [password_data, set_password_data] = useState({
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
  });
  // parameters
  const total_income = Number(
    savings?.reduce((a, b) => a + b.amount, 0).toFixed(2)
  );
  const total_earned_income =
    total_income -
    Number(
      savings
        ?.filter((item) => item.details.title === "Loan Received")
        ?.reduce((a, b) => a + b.details.amount, 0)
    );

  const total_expenses = Number(
    expenses?.reduce((a, b) => a + b.total_cost, 0).toFixed(2)
  );
  const actual_total_expenses =
    total_expenses -
    Number(
      expenses
        ?.filter((exp) => exp.item.startsWith("Settled debt owed to"))
        ?.reduce((a, b) => a + b.total_cost, 0)
    );
  const total_savings = Number(
    savings?.reduce((a, b) => a + b.saved, 0).toFixed(2)
  );
  const total_advance = loans?.reduce((a, b) => a + b.amount, 0);
  const total_spendable = Number(
    savings?.reduce((a, b) => a + b.balance, 0).toFixed(2)
  );
  const spendable_utilization_percentage = isNaN(
    total_expenses / total_spendable
  )
    ? 0
    : Number(((total_expenses / total_spendable) * 100).toFixed(2));
  const actual_savings = total_income - total_expenses;
  const savings_efficiency = isNaN(
    (total_income - total_expenses) / total_savings
  )
    ? 0
    : (((total_income - total_expenses) / total_savings) * 100).toFixed(2);
  const total_borrowed = borrowedList?.reduce(
    (a, b) => a + Number(b.amount),
    0
  );
  const total_borrow_repayment = borrowed_repayment_history?.reduce(
    (a, b) => a + b.amount,
    0
  );
  const total_borrow_balance = total_borrowed - total_borrow_repayment;
  const total_lent = lentList?.reduce((a, b) => a + Number(b.amount), 0);
  const total_lent_repayment = lend_repayment_history?.reduce(
    (a, b) => a + b.amount,
    0
  );
  const lent_balance = total_lent - total_lent_repayment;

  const untracked = Number(
    (total_income - total_savings - total_expenses).toFixed(2)
  );
  const [basic_info, set_basic_info] = useState({
    name: user?.name,
    phone: user?.phone,
    email: user?.email,
    password: "",
  });
  const monthly_analysis_data = () => {
    let data = [];
    formattedDates.map((month, index) => {
      let data_object = {
        title: month,
        id:
          (index + 1).toString().length === 1
            ? `0${index + 1}`
            : (index + 1).toString(),
        total_savings: Number(
          savingsList
            ?.filter((item) => item?.createdAt.endsWith(month))
            ?.reduce((a, b) => a + b.saved, 0)
            .toFixed(2)
        ),
        total_income: Number(
          savingsList
            ?.filter((item) => item?.createdAt.endsWith(month))
            ?.reduce((a, b) => a + b.amount, 0)
            .toFixed(2)
        ),
        total_expenses: Number(
          expensesList
            ?.filter((item) => item?.created_at.endsWith(month))
            ?.reduce((a, b) => a + b.total_cost, 0)
            .toFixed(2)
        ),
        total_advance: Number(
          loans
            ?.filter((item) => item?.createdAt.endsWith(month))
            ?.reduce((a, b) => a + b.amount, 0)
            .toFixed(2)
        ),
        spendable_amount: Number(
          savingsList
            ?.filter((item) => item?.createdAt.endsWith(month))
            ?.reduce((a, b) => a + b.balance, 0)
            .toFixed(2)
        ),
      };
      data.push(data_object);
      return data_object;
    });
    return data;
  };
  const analysis_data = monthly_analysis_data();

  const peak_income = analysis_data?.sort((a, b) =>
    a.total_income < b.total_income ? 1 : -1
  )[0];
  const peak_expenses = analysis_data?.sort((a, b) =>
    a.total_expenses < b.total_expenses ? 1 : -1
  )[0];
  const peak_savings = analysis_data?.sort((a, b) =>
    a.total_savings < b.total_savings ? 1 : -1
  );
  const average_income = (
    total_income /
    (user?.notifications?.length + 1)
  ).toFixed(2);
  const average_savings = (
    total_savings /
    (user?.notifications?.length + 1)
  ).toFixed(2);
  const average_expenses = (
    total_expenses /
    (user?.notifications?.length + 1)
  ).toFixed(2);
  const [show_basic_info_dialog, set_basic_info_dialog] = useState(false);
  const handle_open_basic_info_dialog = () =>
    set_basic_info_dialog(!show_basic_info_dialog);

  // update user's basic info
  const handle_basic_info = async (basic_info) => {
    if (
      !basic_info.name ||
      !basic_info.email ||
      !basic_info.phone ||
      !basic_info.password
    ) {
      context?.handleSnackbar(
        "Please enter valid input for all fields",
        "warning"
      );
    } else {
      try {
        const res = await request.put(`/user/info?id=${user.id}`, basic_info, {
          headers,
        });
        context?.handleSnackbar(res.data, "success");
        user = {
          ...user,
          email: basic_info.email,
          phone: basic_info.phone,
          name: basic_info.name,
        };
        storeUser(user);
      } catch (err) {
        context?.handleSnackbar(
          err.response ? err.response.data : "Network error",
          "error"
        );
      }
    }
  };
  //   update password
  const handlePasswordChange = async (password_data) => {
    if (
      password_data.oldPassword.length < 6 ||
      password_data.newPassword !== password_data.newPassword2 ||
      password_data.newPassword.length < 6
    ) {
      context?.handleSnackbar("Please provide valid input.", "warning");
    } else {
      try {
        const res = await request.put("/user/password", password_data, {
          headers,
        });
        context?.handleSnackbar(res.data, "success");
      } catch (err) {
        context?.handleSnackbar(
          err.response ? err.response.data : "Network error",
          "error"
        );
      }
    }
  };
  // income chart data
  const income_chart = () => {
    let data = [];
    user?.sources_of_income?.map((source) => {
      let data_object = {
        title: source,
        amount: savings
          ?.filter((item) => item.source === source)
          ?.reduce((a, b) => a + b.amount, 0),
      };
      data_object?.amount > 0 && data.push(data_object);
      return data_object;
    });
    return data;
  };
  let income_chart_data = income_chart();

  return {
    openPass,
    handleOpenPass,
    handlePasswordChange,
    set_password_data,
    password_data,
    handle_open_basic_info_dialog,
    basic_info,
    set_basic_info,
    show_basic_info_dialog,
    handle_basic_info,
    // chart_data,
    income_chart_data,
    // monthly_income_data,
    total_income,
    total_earned_income,
    total_expenses,
    actual_total_expenses,
    total_savings,
    total_advance,
    total_borrowed,
    total_borrow_repayment,
    total_borrow_balance,
    total_lent,
    total_lent_repayment,
    lent_balance,
    untracked,
    total_spendable,
    spendable_utilization_percentage,
    savings_efficiency,
    actual_savings,
    peak_income,
    average_income,
    average_savings,
    average_expenses,
    expenses,
    peak_expenses,
    peak_savings,
    portfolio,
    formattedDates,
    analysis_data,
    radar_chart_data,
  };
};

export default useSettings;
