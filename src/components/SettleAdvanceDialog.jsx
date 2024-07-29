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
const SettleAdvanceDialog = ({
  open,
  toggleDialog,
  settledDebt,
  getSettled,
  settleDebt,
  settle,
  setSettle,
  setGetSettled,
}) => {
  const { loading } = useApp();
  const borrowedList =
    JSON.parse(window.localStorage.getItem("borrowed")) || [];
  const lentList = JSON.parse(window.localStorage.getItem("lent")) || [];
  const {
    settleType,
    toggleSettleType,
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
      <DialogTitle>
        {settleType === "settle"
          ? "Settle some or all of your debts"
          : "Getting Settled"}
      </DialogTitle>
      <DialogContent>
        <div className="dialog-form-container">
          <label className="dialog-label" htmlFor="">
            {settleType === "settle"
              ? "Who are you settling?"
              : "Who is settling you?"}
          </label>
          <select
            placeholder="e.g. Jon Snow"
            className="login-input"
            onChange={(e) =>
              settleType === "settle"
                ? setSettle((prev) => ({ ...prev, id: e.target.value }))
                : setGetSettled((prev) => ({ ...prev, id: e.target.value }))
            }
          >
            <option value="">Choose party</option>
            {settleType === "settle"
              ? borrowedList?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.lender}
                  </option>
                ))
              : lentList?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item?.borrower}
                  </option>
                ))}
          </select>

          <label className="dialog-label" htmlFor="">
            {settleType === "settle"
              ? "This is how much you owe!"
              : "This is how much this person owes you!"}
          </label>
          <input
            type="number"
            placeholder="100"
            className="login-input"
            readOnly
            value={
              settleType === "settle"
                ? borrowedList?.find((item) => item.id === settle?.id)?.amount -
                  (borrowedList
                    ?.find((item) => item.id === settle?.id)
                    ?.repayment_history?.reduce((a, b) => a + b.amount, 0) || 0)
                : lentList?.find((item) => item.id === getSettled?.id)?.amount -
                  (lentList
                    ?.find((item) => item.id === getSettled?.id)
                    ?.repayment_history?.reduce((a, b) => a + b.amount, 0) || 0)
            }
          />
          <label className="dialog-label" htmlFor="">
            {settleType === "settle"
              ? "How much are you settling?"
              : "How much are you getting settled?"}
          </label>
          <input
            type="number"
            placeholder="100"
            className="login-input"
            value={
              settleType === "settle" ? settle?.amount : getSettled?.amount
            }
            onChange={(e) =>
              settleType === "settle"
                ? setSettle((prev) => ({
                    ...prev,
                    amount: Number(e.target.value),
                  }))
                : setGetSettled((prev) => ({
                    ...prev,
                    amount: Number(e.target.value),
                  }))
            }
          />
          <button
            className="login-btn"
            onClick={() =>
              settleType === "settle"
                ? settleDebt(settle)
                : settledDebt(getSettled)
            }
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
