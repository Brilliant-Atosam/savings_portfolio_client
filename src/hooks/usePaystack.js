import { useState } from "react";
import Util from "../utils/util";
import request from "../utils/request";
const usePaystack = () => {
  const [openSubscribeDialog, setOpenSubscribeDialog] = useState(false);
  const toggleSubscribeDialog = () => setOpenSubscribeDialog((prev) => !prev);
  const { user, storeUser } = Util();
  const config = {
    currency: "GHS",
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: 20000,
    publicKey: "pk_test_a4eedcb4eea43bfc6739e2918441ae96d74b421b",
  };
  const change_tier = async () => {
    try {
      const res = await request.put(
        `/user/status?id=${user.id}`,
        {},
        { headers: { access_token: `Bearer ${user.access_token}` } }
      );
      await storeUser({ ...user, tier: "premium" });
      alert(res.data);
    } catch (err) {
      alert(err.message);
    }
  };
  const onSuccess = () => change_tier();
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
