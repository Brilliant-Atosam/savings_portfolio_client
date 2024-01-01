import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import useApp from "../useApp";
import moment from "moment";
import "../styles/login.css";
import usePortfolio from "../hooks/usePortfolio";
const AddPortfolioDialog = ({ open }) => {
  const { handlePortfolioDialog, loading } = useApp();
  const { setNewPortfolio, addPortfolio, newPortfolio } = usePortfolio();
  return (
    <Dialog open={open}>
      <DialogTitle className="login-text">
       Create a saving portfolio
      </DialogTitle>

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
            Percentage of income to save:
          </label>
          <input
            type="number"
            placeholder="E.g. 2[% of total income]"
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
            // value={moment(newPortfolio?.deadline).format("yyyy-MM-dd")}
            onChange={(e) =>
              setNewPortfolio({
                ...newPortfolio,
                deadline: moment(e.target.value).format("DD/MM/YYYY"),
              })
            }
          />
          <button className="login-btn" onClick={addPortfolio}>
            {loading ? "loading..." : "Create portfolio"}
          </button>
          <button className="dialog-close-btn" onClick={handlePortfolioDialog}>
            Close
          </button>
        </div>
      </DialogContent>
      <div className="loading-container">
        {loading && <CircularProgress color="primary" />}
      </div>
    </Dialog>
  );
};

export default AddPortfolioDialog;
