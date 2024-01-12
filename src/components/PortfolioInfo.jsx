import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import Util from "../utils/util";

const PortfolioInfo = ({ open, toggler, data }) => {
  const { format_currency } = Util();
  return (
    <Dialog open={open}>
      <DialogTitle className="login-text">Portfolio info</DialogTitle>
      <DialogContent>
        <div className="portfolio-info-container">
          <div className="key-value-container">
            <span className="info-key">Title:</span>
            <span className="info-value">{data?.title}</span>
          </div>
          <div className="key-value-container">
            <span className="info-key">Description:</span>
            <span className="info-value">{data?.reason}</span>
          </div>
          <div className="key-value-container">
            <span className="info-key">Goal:</span>
            <span className="info-value">{format_currency(data?.goal)}</span>
          </div>

          <div className="key-value-container">
            <span className="info-key">Percentage:</span>
            <span className="info-value">{data?.percentage}%</span>
          </div>
          <div className="key-value-container">
            <span className="info-key">Milestone:</span>
            <span className="info-value">{format_currency(data?.amount)}</span>
          </div>
          <div className="key-value-container">
            <span className="info-key">Deadline:</span>
            <span className="info-value">{data?.deadline}</span>
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
