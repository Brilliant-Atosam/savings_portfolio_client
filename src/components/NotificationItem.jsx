import React from "react";
import { Link } from "react-router-dom";
import Util from "../utils/util";
const NotificationItem = ({ title, read }) => {
  const { months } = Util();
  return (
    <Link
      to={`/highlights/month?month=${title}`}
      className={
        read
          ? "read notification-item-container"
          : "notification-item-container"
      }
    >
      Financial Highlights for {months[Number(title.split("/")[0]) - 1]}{" "}
      {Number(title.split("/")[1])}
    </Link>
  );
};

export default NotificationItem;
