import { PaystackButton } from "react-paystack";
import usePaystack from "../hooks/usePaystack";
const Subscription = () => {
  const { config, onClose, onSuccess } = usePaystack();
  const buttonProps = {
    ...config,
    text: "go premium",
    onSuccess: () => onSuccess,
    onClose: () => onClose,
  };
  return <PaystackButton {...buttonProps} />;
};

export default Subscription;
