import { useState } from "react";
import useApp from "../useApp";
import request from "../utils/request";
import Util from "../utils/util";

const useSettings = () => {
  const { handleSnackbar } = useApp();
  let user = JSON.parse(localStorage.getItem("user"));
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
  };
};

export default useSettings;
