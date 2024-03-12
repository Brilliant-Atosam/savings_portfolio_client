// import "../styles/common.css";
import { usePaystackPayment } from "react-paystack";
import usePaystack from "../hooks/usePaystack";
const Subscription = () => {
  const { config, onClose, onSuccess } = usePaystack();
  const initializePayment = usePaystackPayment(config);
  return (
    <div className="main-container">
      <button
        onClick={() => initializePayment(onClose, onSuccess)}
        className="subscribe-btn"
      >
        Go premium
      </button>
    </div>
  );
};

export default Subscription;
