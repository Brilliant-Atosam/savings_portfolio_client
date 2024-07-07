import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import Util from "../utils/util";
const BorrowDetails = ({ open, toggler, data }) => {
  const { format_currency } = Util();
  return (
    <Dialog open={open} className="dialog-container">
      <DialogTitle className="login-text">Portfolio info</DialogTitle>
      <DialogContent>
        <div className="portfolio-info-container">
          <div className="key-value-container">
            <span className="info-key">id:</span>
            <span className="info-value">{data?.id}</span>
          </div>
          <div className="key-value-container">
            <span className="info-key">Amount:</span>

            <span className="info-value">
              {format_currency(Number(data?.amount))}
            </span>
          </div>
          <div className="key-value-container">
            <span className="info-key">Reason:</span>
            <span className="info-value">{data?.reason}</span>
          </div>
          <div className="key-value-container">
            <span className="info-key">Lender:</span>
            <span className="info-value">{data?.lender}</span>
          </div>
          <div className="key-value-container">
            <span className="info-key">Amount Settled:</span>
            <span className="info-value">{format_currency(data?.settled)}</span>
          </div>
          <div className="key-value-container">
            <span className="info-key">Balance:</span>
            <span className="info-value">{data?.balance}</span>
          </div>
          <div className="key-value-container">
            <span className="info-key">Repayment History:</span>
            <table>
              <tr>
                <th>Date</th>
                <th>Amount</th>
              </tr>
              {data?.repayment_history?.map((item) => (
                <tr>
                  <td>{item?.settled_at}</td>
                  <td>{format_currency(item?.amount)}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggler}>close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BorrowDetails;
