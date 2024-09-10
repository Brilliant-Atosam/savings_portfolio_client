import "../styles/notifications.css";
import Topbar from "../components/Topbar";
import NotificationItem from "../components/NotificationItem";
import useApp from "../useApp";

const Notifications = () => {
  const { user } = useApp();
  const { notifications } = user;
  return (
    <div className="main-container">
      <Topbar />
      <div className="notification-container">
        <h1 className="notification-heading">Monthly Financial Insights</h1>
        <div className="notification-items-container">
          {notifications?.length > 0 ? (
            notifications?.map((item) => (
              <NotificationItem title={item.title} read={item.read} />
            ))
          ) : (
            <h2 className="no-notification-heading">
              You have no notification
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
