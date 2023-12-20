import "../styles/settings.css";
import BasicInfo from "../components/BasicInfo";
import Password from "../components/Password";
import Topbar from "../components/Topbar";
import useSettings from "../hooks/useSettings";
import useApp from "../useApp";

const Settings = () => {
  const { user } = useApp();
  const {
    handleOpenPass,
    openPass,
    handlePasswordChange,
    handle_open_basic_info_dialog,
    show_basic_info_dialog,
    handle_basic_info,
  } = useSettings();
  return (
    <div className="main-container">
      <Topbar />
      <Password
        open={openPass}
        handleOpenPass={handleOpenPass}
        handlePassChange={handlePasswordChange}
      />
      <BasicInfo
        open={show_basic_info_dialog}
        handleOpenBasicInfo={handle_open_basic_info_dialog}
        handleBasicInfoChange={handle_basic_info}
      />
      <div className="settings-container">
        <div className="personal-info">
          <div className="key-value-pairs">
            <h1 className="info-key">Name: </h1>
            <h1 className="info-value">{user.name}</h1>
          </div>
          <div className="key-value-pairs">
            <h1 className="info-key">Email: </h1>
            <h1 className="info-value">{user.email}</h1>
          </div>
          <div className="key-value-pairs">
            <h1 className="info-key">Phone: </h1>
            <h1 className="info-value">{user.phone}</h1>
          </div>
          <div className="settings-actions">
            <button
              className="settings-action-btn login-btn"
              onClick={handle_open_basic_info_dialog}
            >
              Change personal info
            </button>
            <button
              className="settings-action-btn dialog-close-btn"
              onClick={() => handleOpenPass()}
            >
              Change password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
