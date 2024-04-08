import { PaystackButton } from "react-paystack";
import usePaystack from "../hooks/usePaystack";
const Subscription = () => {
  const { config, onClose, onSuccess } = usePaystack();
  // console.log(onSuccess);
  // const initializePayment = usePaystackPayment(config);
  const buttonProps = {
    ...config,
    text: "go premium",
    onSuccess: () => onSuccess,
    onClose: () => onClose,
  };
  return (
    <PaystackButton {...buttonProps} />
    // <PaystackConsumer {...buttonProps}>
    //   {(initializePayment) => (
    //     <button
    //       onClick={() => {
    //         initializePayment(onSuccess, onClose);
    //       }}
    //       className="subscribe-btn"
    //     >
    //       Go premium
    //     </button>
    //   )}
    // </PaystackConsumer>
  );
};

export default Subscription;
