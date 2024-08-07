import { PaystackButton } from "react-paystack";
import usePaystack from "../hooks/usePaystack";
const Subscription = () => {
  const { config, onClose, onSuccess } = usePaystack();
  const buttonProps = {
    ...config,
    text: "Go Premium Now",
    onSuccess,
    onClose,
  };
  return <PaystackButton {...buttonProps} className="subscribe-btn" />;
};

export default Subscription;
