import axios from "axios";
import { useState } from "react";

const useExchange = () => {
  const [exchangeData, setExchangeData] = useState({
    amount: 0,
    from: "",
    fromIndex: 0,
    to: "",
    toIndex: 0,
  });
  const [exchangeResult, setExchangeResult] = useState(null);
  const fetchExchange = async () => {
    if (exchangeData.amount < 1 || !exchangeData.from || !exchangeData.to) {
      alert("Gotcha!");
    } else {
      const res = await axios.get(
        `https://v6.exchangerate-api.com/v6/705c9276e4642a4b8de1d113/pair/${exchangeData.from}/${exchangeData.to}/${exchangeData.amount}`
      );
      setExchangeResult(res.data);
    }
  };
  return {
    exchangeData,
    setExchangeData,
    fetchExchange,
    exchangeResult,
  };
};

export default useExchange;
