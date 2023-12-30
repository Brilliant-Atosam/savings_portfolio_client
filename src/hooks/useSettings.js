import { useState } from "react";
import useApp from "../useApp";
import request from "../utils/request";
import Util from "../utils/util";

const useSettings = () => {
  const { handleSnackbar } = useApp();
  let user = JSON.parse(localStorage.getItem("user"));
  let savings = JSON.parse(localStorage.getItem("savings"));
  let expenses = JSON.parse(localStorage.getItem("expenses"));
  const { storeUser } = Util();
  const [openPass, setOpenPass] = useState(false);
  const handleOpenPass = () => setOpenPass(!openPass);
  //   password info
  const [password_data, set_password_data] = useState({
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
  });
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
      amount: user.total_amount_saved,
    },
    {
      title: "expense",
      amount: expenses?.reduce((a, b) => a + b.total_cost, 0),
    },
    {
      title: "untracked",
      amount:
        user.total_income - (user.total_expense + user.total_amount_saved),
    },
  ];
  // income chart data
  const income_chart = () => {
    let data = [];
    user.sources_of_income.map((source) => {
      let data_object = {
        title: source,
        amount: savings
          .filter((item) => item.source === source)
          .reduce((a, b) => a + b.amount, 0),
      };
      data.push(data_object);
      return data_object;
    });
    return data;
  };
  let income_chart_data = income_chart();
  console.log(income_chart_data);
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
  };
};

export default useSettings;
