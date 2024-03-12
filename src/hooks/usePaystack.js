import { useState } from "react";
import Util from "../utils/util";
const usePaystack = () => {
  const [openSubscribeDialog, setOpenSubscribeDialog] = useState(false);
  const toggleSubscribeDialog = () => setOpenSubscribeDialog((prev) => !prev);
  const { user } = Util();
  const config = {
    currency: "GHS",
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: 20000,
    publicKey: "pk_test_a4eedcb4eea43bfc6739e2918441ae96d74b421b",
  };
  const onSuccess = () => {
    console.log("Good");
  };
  const onClose = () => {
    console.log("Closed");
  };
  return {
    config,
    onSuccess,
    onClose,
    toggleSubscribeDialog,
    openSubscribeDialog,
  };
};

export default usePaystack;
