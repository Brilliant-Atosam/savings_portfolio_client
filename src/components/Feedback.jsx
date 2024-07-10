import { Alert, Button, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";
const Feedback = ({ snackbar, toggler }) => {
  const action = (
    <React.Fragment>
      <Button>
        <Close fontSize="small" onClick={toggler} />
      </Button>
    </React.Fragment>
  );
  return (
    <Snackbar autoHideDuration={6000} open={snackbar?.open}>
      <Alert
        severity={snackbar?.severity}
        sx={{ width: "100%" }}
        action={action}
      >
        {snackbar?.feedback}
      </Alert>
    </Snackbar>
  );
};
export default Feedback;
