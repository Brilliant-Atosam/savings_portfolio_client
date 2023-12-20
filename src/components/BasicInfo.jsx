import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "../styles/login.css";
import useSettings from "../hooks/useSettings";
const BasicInfo = ({ open, handleBasicInfoChange, handleOpenBasicInfo }) => {
  const { basic_info, set_basic_info } = useSettings();
  return (
    <Dialog open={open}>
      <DialogTitle className="login-text">Change Basic info</DialogTitle>
      <DialogContent>
        <div className="dialog-form-container">
          <label className="dialog-label" htmlFor="">
            Name:
          </label>
          <input
            type="text"
            placeholder="Jon Snow"
            className="login-input"
            onChange={(e) =>
              set_basic_info((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            value={basic_info.name}
          />
          <label className="dialog-label" htmlFor="">
            Email:
          </label>
          <input
            type="text"
            placeholder="jonsnow@hbo.got"
            className="login-input"
            onChange={(e) =>
              set_basic_info((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            value={basic_info.email}
          />
          <label className="dialog-label" htmlFor="">
            Phone:
          </label>
          <input
            type="text"
            placeholder="0544006865"
            className="login-input"
            onChange={(e) =>
              set_basic_info((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            value={basic_info.phone}
          />
          <label className="dialog-label" htmlFor="">
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter login password"
            className="login-input"
            onChange={(e) =>
              set_basic_info((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            value={basic_info.password}
          />
          <button
            onClick={() => handleBasicInfoChange(basic_info)}
            className="login-btn"
          >
            Change basic info
          </button>
          <button onClick={handleOpenBasicInfo} className="dialog-close-btn">
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BasicInfo;
