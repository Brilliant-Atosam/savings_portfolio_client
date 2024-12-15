import axios from "axios";
import { useState } from "react";
import useApp from "../useApp";

const useExchange = () => {
  const { handleLoader } = useApp();
  const [exchangeData, setExchangeData] = useState({
    amount: 0,
    from: "",
    fromIndex: 0,
    to: "",
    toIndex: 0,
  });
  const [exchangeResult, setExchangeResult] = useState(null);
  const fetchExchange = async () => {
    handleLoader();
    if (exchangeData.amount < 1 || !exchangeData.from || !exchangeData.to) {
      alert("Kindly provide data for all fields!");
    } else {
      const res = await axios.get(
        `https://v6.exchangerate-api.com/v6/705c9276e4642a4b8de1d113/pair/${exchangeData.from}/${exchangeData.to}/${exchangeData.amount}`
      );
      setExchangeResult(res.data);
    }
    handleLoader();
  };
  return {
    exchangeData,
    setExchangeData,
    fetchExchange,
    exchangeResult,
  };
};

export default useExchange;
