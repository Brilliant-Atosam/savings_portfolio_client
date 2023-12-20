import { useState } from "react";

const useFeedback = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    feedback: "",
    severity: "info",
  });

  const handleSnackbar = (feedback, severity) => {
    setSnackbar((prev) => ({ ...prev, feedback, severity, open: !prev.open }));
  };
  return { handleSnackbar, snackbar };
};

export default useFeedback;
