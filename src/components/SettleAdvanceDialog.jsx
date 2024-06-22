import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import useApp from "../useApp";
import useBorrow from "../hooks/useBorrow";
const SettleAdvanceDialog = ({ open, toggleDialog }) => {
  const { loading } = useApp();
  const {
    settleDetails,

    settleAdvance,
    settleType,
    toggleSettleType,
    settle,

    getSettled,
  } = useBorrow();
  return (
    <Dialog open={open}>
      <ToggleButtonGroup
        color="primary"
        value={settleType}
        exclusive
        onChange={(e) => toggleSettleType(e.target.value)}
        aria-label="Platform"
      >
        <ToggleButton value="settle">Settle Debt</ToggleButton>
        <ToggleButton value="get_settle">Get Settled</ToggleButton>
      </ToggleButtonGroup>
      <DialogTitle>Settle all/part of advance</DialogTitle>
      <DialogContent>
        <div className="dialog-form-container">
          <label className="dialog-label" htmlFor="">
            {settleType === "settle"
              ? "Who are you settling?"
              : "Who is settling you?"}
          </label>
          <select
            type="text"
            placeholder="e.g. Jon Snow"
            className="login-input"
            value={settleDetails?.amount}
            onChange={(e) =>
              settleType === "settle"
                ? settle((prev) => ({ ...prev, id: e.target.value }))
                : getSettled((prev) => ({ ...prev, id: e.target.value }))
            }
          >
            <option>Frank</option>
          </select>
          <label className="dialog-label" htmlFor="">
            {settleType === "settle"
              ? "This is how much you owe?"
              : "This is how much this person owes you?"}
          </label>
          <input
            type="number"
            placeholder="e.g. Jon Snow"
            className="login-input"
            value={settleDetails?.amount}
          />
          <label className="dialog-label" htmlFor="">
            {settleType === "settle"
              ? "How much are you settling?"
              : "How much are you getting settled?"}
          </label>
          <input
            type="number"
            placeholder="e.g. Jon Snow"
            className="login-input"
            value={settleDetails?.amount}
            onChange={(e) =>
              settleType === "settle"
                ? settle((prev) => ({
                    ...prev,
                    amount: Number(e.target.value),
                  }))
                : getSettled((prev) => ({
                    ...prev,
                    id: Number(e.target.value),
                  }))
            }
          />
          <button
            className="login-btn"
            onClick={settleAdvance}
            disabled={loading}
          >
            {loading
              ? "loading..."
              : settleType === "settle"
              ? "Settle advance"
              : "Get settled"}
          </button>
          <button className="dialog-close-btn" onClick={toggleDialog}>
            Cancel
          </button>
        </div>
      </DialogContent>
      <div className="loading-container">
        {loading && <CircularProgress color="primary" />}
      </div>
    </Dialog>
  );
};

export default SettleAdvanceDialog;
