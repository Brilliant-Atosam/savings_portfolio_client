import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import useApp from "../useApp";

const ConfirmDialog = ({ open, action, cancel }) => {
  const { confirmData, setConfirmData } = useApp();
  return (
    <Dialog open={open}>
      <DialogTitle className="login-text">{confirmData.heading}</DialogTitle>
      <DialogContent>{confirmData.warning}</DialogContent>
      <DialogActions>
        <Button
          onClick={() => setConfirmData((prev) => ({ ...prev, open: false }))}
        >
          No
        </Button>
        <Button onClick={action}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
