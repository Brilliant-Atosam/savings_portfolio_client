import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import "../styles/login.css";
import useSettings from "../hooks/useSettings";
const Password = ({ open, handlePassChange, handleOpenPass }) => {
  const { set_password_data, password_data } = useSettings();
  return (
    <Dialog open={open}>
      <DialogTitle className="login-text">Change login password</DialogTitle>
      <DialogContent>
        <div className="dialog-form-container">
          <label className="dialog-label" htmlFor="">
            Current Password:
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="login-input"
            onChange={(e) =>
              set_password_data((prev) => ({
                ...prev,
                oldPassword: e.target.value,
              }))
            }
          />
          <label className="dialog-label" htmlFor="">
            New Password:
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="login-input"
            onChange={(e) =>
              set_password_data((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
          />
          <label className="dialog-label" htmlFor="">
            Confirm New Password:
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="login-input"
            onChange={(e) =>
              set_password_data((prev) => ({
                ...prev,
                newPassword2: e.target.value,
              }))
            }
          />
          <button
            onClick={() => handlePassChange(password_data)}
            className="login-btn"
          >
            Change password
          </button>
          <button onClick={handleOpenPass} className="dialog-close-btn">
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Password;
