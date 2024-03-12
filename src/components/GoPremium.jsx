import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import Subscription from "./Subscription";
import usePaystack from "../hooks/usePaystack";
const GoPremium = ({ open, action }) => {
  const { openSubscribeDialog } = usePaystack();
  return (
    <Dialog open={openSubscribeDialog}>
      <DialogTitle className="login-text"> Unlock Premium Features</DialogTitle>
      <DialogContent>
        Upgrade to cashlens Premium for exclusive features and financial
        insights.
      </DialogContent>
      <DialogActions>
        <Button onClick={action}>Keep trying</Button>
        <Subscription />
      </DialogActions>
    </Dialog>
  );
};

export default GoPremium;
