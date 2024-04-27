import { useState } from "react";
import useApp from "../useApp";
import request from "../utils/request";
import Util from "../utils/util";

const useSettings = () => {
  const { handleSnackbar } = useApp();
  let user = JSON.parse(localStorage.getItem("user"));
  let savings = JSON.parse(localStorage.getItem("savings"));
  let expenses = JSON.parse(localStorage.getItem("expenses"));
  let loans = JSON.parse(localStorage.getItem("loans"));
  const { storeUser } = Util();
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
  const total_expenses = Number(
    expenses?.reduce((a, b) => a + b.total_cost, 0).toFixed(2)
  );
  const total_savings = Number(
    savings?.reduce((a, b) => a + b.saved, 0).toFixed(2)
  );
  const total_advance = loans?.reduce((a, b) => a + b.amount, 0);
  const total_spendable = Number(
    savings?.reduce((a, b) => a + b.balance, 0).toFixed(2)
  );
  const spendable_utilization_percentage = Number(
    ((total_expenses / total_spendable) * 100).toFixed(2)
  );
  const actual_savings = total_income - total_expenses;
  const savings_efficiency = (
    ((total_income - total_expenses) / total_savings) *
    100
  ).toFixed(2);
  const untracked = Number(
    (total_income - total_savings - total_expenses).toFixed(2)
  );
  const [basic_info, set_basic_info] = useState({
    name: user?.name,
    phone: user?.phone,
    email: user?.email,
    password: "",
  });
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
      handleSnackbar("Please enter valid input for all fields", "warning");
    } else {
      try {
        const res = await request.put(`/user/info?id=${user.id}`, basic_info, {
          headers: { access_token: `Bearer ${user.access_token}` },
        });
        handleSnackbar(res.data, "success");
        user = {
          ...user,
          email: basic_info.email,
          phone: basic_info.phone,
          name: basic_info.name,
        };
        storeUser(user);
      } catch (err) {
        handleSnackbar(
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
      handleSnackbar("Please provide valid input.", "warning");
    } else {
      try {
        const res = await request.put("/user/password", password_data, {
          headers: { access_token: `Bearer ${user.access_token}` },
        });
        handleSnackbar(res.data, "success");
      } catch (err) {
        handleSnackbar(
          err.response ? err.response.data : "Network error",
          "error"
        );
      }
    }
  };
  const chart_data = [
    {
      title: "savings",
      amount: total_savings,
    },
    {
      title: "expense",
      amount: total_expenses,
    },
    {
      title: "untracked",
      amount: untracked,
    },
  ];
  // income chart data
  const income_chart = () => {
    let data = [];
    user.sources_of_income?.map((source) => {
      let data_object = {
        title: source,
        amount: savings
          .filter((item) => item.source === source)
          .reduce((a, b) => a + b.amount, 0),
      };
      data_object.amount > 0 && data.push(data_object);
      return data_object;
    });
    return data;
  };
  let income_chart_data = income_chart();

  // monthly income data
  // const monthly_income = () => {
  //   let data = [];
  //   months.map((month, index) => {
  //     let object_object = {
  //       title: month,
  //       total_income: savings
  //         .filter((item) =>
  //           item.createdAt?.endsWith(
  //             (index + 1).toString().length === 1
  //               ? `0${index + 1}/${new Date().getFullYear().toString()}`
  //               : `${index + 1}/${new Date().getFullYear().toString()}`
  //           )
  //         )
  //         .reduce((a, b) => a + b?.amount, 0),
  //     };
  //     data.push(object_object);
  //     return object_object;
  //   });
  //   return data;
  // };
  // const monthly_income_data = monthly_income();
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
    chart_data,
    income_chart_data,
    // monthly_income_data,
    total_income,
    total_expenses,
    total_savings,
    total_advance,
    untracked,
    total_spendable,
    spendable_utilization_percentage,
    savings_efficiency,
    actual_savings,
  };
};

export default useSettings;
