import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

const PortfolioInfo = ({ open, toggler }) => {
  return (
    <Dialog open={open}>
      <DialogTitle className="login-text">Portfolio info</DialogTitle>
      <DialogContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
        perspiciatis totam omnis?
      </DialogContent>
      <DialogActions>
        <Button onClick={toggler}>close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PortfolioInfo;
