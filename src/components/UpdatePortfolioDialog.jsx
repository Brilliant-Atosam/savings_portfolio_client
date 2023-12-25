import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import moment from "moment";
import "../styles/login.css";
import useApp from "../useApp";
const UpdatePortfolioDialog = ({
  open,
  updatePortfolio,
  newPortfolio,
  setNewPortfolio,
  toggleDialog,
}) => {
  const { loading } = useApp();
  return (
    <Dialog open={open}>
      <DialogTitle className="login-text">Update saving portfolio</DialogTitle>

      <DialogContent>
        <div className="dialog-form-container">
          <label className="dialog-label" htmlFor="">
            Portfolio title:
          </label>
          <input
            type="text"
            placeholder="e.g. Relocation fund"
            className="login-input"
            value={newPortfolio?.title}
            onChange={(e) =>
              setNewPortfolio({ ...newPortfolio, title: e.target.value })
            }
          />
          <label className="dialog-label" htmlFor="">
            Reason/Description:
          </label>
          <input
            type="text"
            placeholder="Eg. To transport my goods to a new location"
            className="login-input"
            value={newPortfolio?.reason}
            onChange={(e) =>
              setNewPortfolio({ ...newPortfolio, reason: e.target.value })
            }
          />
          <label className="dialog-label" htmlFor="">
            Percentage of income:
          </label>
          <input
            type="number"
            max={100}
            placeholder="E.g. 20[% of total income]"
            className="login-input"
            value={newPortfolio?.percentage}
            onChange={(e) =>
              setNewPortfolio({ ...newPortfolio, percentage: e.target.value })
            }
          />
          <label className="dialog-label" htmlFor="">
            Goal:
          </label>
          <input
            type="number"
            placeholder="E.g.20,000"
            className="login-input"
            value={newPortfolio?.goal}
            onChange={(e) =>
              setNewPortfolio({ ...newPortfolio, goal: e.target.value })
            }
          />
          <label className="dialog-label" htmlFor="">
            Deadline:
          </label>
          <input
            type="date"
            placeholder="E.g. 20,000"
            className="login-input"
            onChange={(e) =>
              setNewPortfolio({
                ...newPortfolio,
                deadline: moment(e.target.value).format("DD/MM/YYYY"),
              })
            }
          />
          <button
            disabled={loading}
            className="login-btn"
            onClick={() => updatePortfolio(newPortfolio)}
          >
            {loading ? "loading..." : "Update portfolio"}
          </button>
          <button className="dialog-close-btn" onClick={toggleDialog}>
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePortfolioDialog;
