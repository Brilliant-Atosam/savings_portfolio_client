import Topbar from "../components/Topbar";
import Util from "../utils/util";
import useExchange from "../hooks/useExchange";
import useApp from "../useApp";
import { CircularProgress } from "@mui/material";
const Exchange = () => {
  const { currencies, format_currency } = Util();
  const { loading } = useApp();

  const { exchangeData, setExchangeData, fetchExchange, exchangeResult } =
    useExchange();
  return (
    <div className="main-container">
      <Topbar />
      <div className="exchange-container">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/money-exchange-illustration-download-in-svg-png-gif-file-formats--currency-app-service-e-wallet-digital-exchanger-pack-people-illustrations-4494365.png"
          alt="cashlens logo"
          className="login-logo"
        />
        <div className="login-form-container">
          <h3 className="login-text">cashlens currency converter</h3>
          <input
            type="number"
            placeholder="Enter amount"
            className="login-input"
            onChange={(e) =>
              setExchangeData((prev) => ({ ...prev, amount: e.target.value }))
            }
          />
          <select
            name=""
            placeholder="Select currency"
            className="login-input"
            onChange={(e) =>
              setExchangeData((prev) => ({
                ...prev,
                from: e.target.value,
                fromIndex: currencies.findIndex(
                  (currency) => currency.currency === e.target.value
                ),
              }))
            }
          >
            <option value="">Convert from</option>
            {currencies.map((currency) => (
              <option value={currency.currency} key={currency.currency}>
                {currency.name}
              </option>
            ))}
          </select>
          <select
            name=""
            placeholder="Select currency"
            className="login-input"
            onChange={(e) =>
              setExchangeData((prev) => ({
                ...prev,
                to: e.target.value,
                toIndex: currencies.findIndex(
                  (currency) => currency.currency === e.target.value
                ),
              }))
            }
          >
            <option value="">Convert to</option>
            {currencies.map((currency) => (
              <option value={currency.currency} key={currency.currency}>
                {currency.name}
              </option>
            ))}
          </select>
          <button onClick={fetchExchange} className="login-btn">
            {loading ? "loading..." : "Convert Now"}
          </button>
          {loading && <CircularProgress />}
          {exchangeResult && (
            <div className="exchange-results-container">
              <div className="key-value-container">
                <span className="info-key">Conversion rate</span>
                <span className="info-value">
                  {exchangeResult?.conversion_rate}
                </span>
              </div>
              <div className="key-value-container">
                <span className="info-key">Conversion results</span>
                <span className="info-value">
                  {format_currency(
                    exchangeResult?.conversion_result,
                    currencies[exchangeData.toIndex].locale,
                    currencies[exchangeData.toIndex].currency
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exchange;
