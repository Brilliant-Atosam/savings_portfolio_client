import { usePaystackPayment } from "react-paystack";
import usePaystack from "../hooks/usePaystack";
const Subscription = () => {
  const { config, onClose, onSuccess } = usePaystack();
  const initializePayment = usePaystackPayment(config);
  return (
      <button
        onClick={() => initializePayment(onClose, onSuccess)}
        className="subscribe-btn"
      >
        Go premium
      </button>
  );
};

export default Subscription;
