import { Alert, Button, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";
const Feedback = ({ open, message, close, severity }) => {
  const action = (
    <React.Fragment>
      <Button>
        <Close fontSize="small" onClick={close} />
      </Button>
    </React.Fragment>
  );
  return (
    <Snackbar autoHideDuration={6000} open={open}>
      <Alert severity={severity} sx={{ width: "100%" }} action={action}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default Feedback;
