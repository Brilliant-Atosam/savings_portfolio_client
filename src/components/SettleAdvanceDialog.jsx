import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import useApp from "../useApp";
import useBorrow from "../hooks/useBorrow";
const SettleAdvanceDialog = ({ open, toggleDialog }) => {
  const { user } = useApp();
  const { settleDetails, setSettleDetails, settleAdvance } = useBorrow();
  return (
    <Dialog open={open}>
      <DialogTitle>Settle all/part of advance</DialogTitle>
      {user.total_advance < 1 && (
        <DialogTitle className="red">
          You do not have any outstanding advance
        </DialogTitle>
      )}
      <DialogContent>
        <div className="dialog-form-container">
          <p>Total advance: {user?.total_advance}</p>
          <label className="dialog-label" htmlFor="">
            How much do you wish to settle?
          </label>
          <input
            type="number"
            placeholder="Amount"
            className="login-input"
            value={settleDetails?.amount}
            onChange={(e) =>
              setSettleDetails((prev) => ({
                ...prev,
                amount: Number(e.target.value),
                balance: prev.total_advance - Number(e.target.value),
              }))
            }
          />

          <button className="login-btn" onClick={settleAdvance}>
            Settle advance
          </button>
          <button className="dialog-close-btn" onClick={toggleDialog}>
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettleAdvanceDialog;
