import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import Util from "../utils/util";
import moment from "moment";
import {
  Alarm,
  ChatBubbleOutline,
  DirectionsRun,
  HourglassBottom,
  RotateRight,
  SportsScore,
  Title,
} from "@mui/icons-material";
const PortfolioInfo = ({ open, toggler, data }) => {
  const { format_currency } = Util();
  return (
    <Dialog open={open} className="dialog-container">
      <DialogTitle className="login-text">Portfolio info</DialogTitle>
      <DialogContent>
        <div className="portfolio-info-container">
          <div className="key-value-container">
            <span className="info-key">
              <Title className="dialog-icon" />
              Title:
            </span>
            <span className="info-value">{data?.title}</span>
          </div>
          <div className="key-value-container">
            <span className="info-key">
              <ChatBubbleOutline className="dialog-icon" /> Description:
            </span>

            <span className="info-value">{data?.reason}</span>
          </div>
          <div className="key-value-container">
            <span className="info-key">
              <SportsScore className="dialog-icon" />
              Goal:
            </span>
            <span className="info-value">
              {format_currency(data?.goal)} ({data?.percentage}% of income)
            </span>
          </div>
          <div className="key-value-container">
            <span className="info-key">
              <DirectionsRun className="dialog-icon" />
              Milestone:
            </span>
            <span className="info-value">
              {format_currency(data?.amount)} (
              {((data?.amount / data?.goal) * 100).toFixed(2)}% of goal)
            </span>
          </div>
          <div className="key-value-container">
            <span className="info-key">
              <RotateRight className="dialog-icon" />
              Progress:
            </span>
            <div className="progress-container">
              <div
                className="progress"
                style={{ width: `${(data?.amount / data?.goal) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="key-value-container">
            <span className="info-key">
              <HourglassBottom className="dialog-icon" />
              Deadline:
            </span>
            <span className="info-value">{data?.deadline}</span>
          </div>
          <div className="key-value-container">
            <span className="info-key">
              <Alarm className="dialog-icon" />
              Time left:
            </span>
            <span className="info-value">
              {moment().to(moment(data?.deadline, "DD/MM/YYYY"))}
            </span>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggler}>close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PortfolioInfo;
