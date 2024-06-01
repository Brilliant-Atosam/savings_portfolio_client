import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Util from "../utils/util";
const NotificationItem = ({ title, read }) => {
  const { months } = Util();
  console.log(months[Number(title.split("/")[0]) - 1]);
  return (
    <Link
      to={`/highlights?month=${title}`}
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
