import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useApp from "../useApp";
const SettleBorrowedMoney = () => {
  const { loading } = useApp();
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
          <button className="login-btn">
            {loading ? "loading..." : "settle borrowed money"}
          </button>
          <button className="dialog-close-btn">Cancel</button>
        </div>
      </DialogContent>
      <div className="loading-container">
        {loading && <CircularProgress color="primary" />}
      </div>
    </Dialog>
  );
};

export default SettleBorrowedMoney;
