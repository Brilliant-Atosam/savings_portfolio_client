import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import useApp from "../useApp";
import { CircularProgress } from "@mui/material";
const ConfirmDialog = ({ open, action, cancel }) => {
  const { confirmData, setConfirmData, loading } = useApp();
  return (
    <Dialog open={open}>
      <DialogTitle className="login-text">{confirmData.heading}</DialogTitle>
      <DialogContent>{confirmData.warning}</DialogContent>
      <DialogActions>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Button
              onClick={() =>
                setConfirmData((prev) => ({ ...prev, open: false }))
              }
            >
              No
            </Button>
            <Button onClick={() => action(confirmData.item)}>Yes</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
