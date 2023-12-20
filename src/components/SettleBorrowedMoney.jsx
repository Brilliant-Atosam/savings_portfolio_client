import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
const SettleBorrowedMoney = () => {
  return (
    <Dialog open={false}>
      <DialogTitle>Settle borrowed money</DialogTitle>
      <DialogContent>
        <div className="dialog-form-container">
          <input
            type="number"
            placeholder="Amount"
            className="login-input"
            value={300}
            disabled
          />
          <input
            type="number"
            placeholder="Repayment amount"
            className="login-input"
          />
          <button className="login-btn">settle borrowed money</button>
          <button className="dialog-close-btn">Cancel</button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettleBorrowedMoney;
