import { Link } from "react-router-dom";
import "../styles/homepage.css";
import "../styles/contact.css";
import { BsSun } from "react-icons/bs";
import { PiBinocularsThin } from "react-icons/pi";
import { MdGroupWork, MdOutlinePolicy } from "react-icons/md";
import { MailOutline, Phone, WhatsApp, YouTube } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import img from "../images/img.png";
import useApp from "../useApp";
import Util from "../utils/util";
import useExchange from "../hooks/useExchange";
import { CircularProgress } from "@mui/material";
import Footer from "../components/Footer";
const Homepage = () => {
  const { currencies, format_currency } = Util();
  const { loading } = useApp();

  const { exchangeData, setExchangeData, fetchExchange, exchangeResult } =
    useExchange();
  return (
    <div className="main-container">
      <Navbar />
      {/* intro */}
      <div className="intro-container">
        <div className="intro-content">
          <p className="intro-heading">
            cashlens tracks your finance: what comes in from where; what goes
            out to where; and helps you focus, track, and thrive
          </p>
          <div className="intro-nav-links">
            <Link to="/login" className="intro-nav-btn intro-nav-btn1">
              Get started now!
            </Link>
          </div>
        </div>
        <div className="intro-graphics">
          <img
            src="https://multiviewcorp.com/hs-fs/hubfs/News%20and%20Blog/Featured/cash-flow-graphic.png?width=1920&height=1920&name=cash-flow-graphic.png"
            alt=""
            className="intro-img"
          />
        </div>
      </div>
      {/* features */}
      <div className="features-container">
        <h1 className="features-title">With cashlens you can:</h1>
        <div className="features">
          <div className="feature">
            <div className="feature-img-container">
              <img src="/track_income.png" alt="" className="feature-img" />
            </div>
            <div className="feature-text-container">
              <h1 className="feature-title">Track your income</h1>
              <p className="feature-description">
                Monitor all earnings, from paychecks to side gigs to gifts. Know
                where your money comes from and how much.
              </p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-img-container">
              <img src="/track_expenses.png" alt="" className="feature-img" />
            </div>
            <div className="feature-text-container">
              <h1 className="feature-title">Track your expenses</h1>
              <p className="feature-description">
                Categorize and control spending. Know where your money goes for
                smarter budgeting.
              </p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-img-container">
              <img src="/track_savings.png" alt="" className="feature-img" />
            </div>
            <div className="feature-text-container">
              <h1 className="feature-title">Save in portfolios</h1>
              <p className="feature-description">
                Personalize and track separate different savings goals - eg.
                emergency fund, business expansion fund, vacation, etc.
              </p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-img-container">
              <img
                src="/track_performance.png"
                alt=""
                className="feature-img"
              />
            </div>
            <div className="feature-text-container">
              <h1 className="feature-title">Track performance</h1>
              <p className="feature-description">
                Receive monthly highlights that analyze your financial
                performance, comparing it to your previous, average, and peak
                performances across various aspects of your finances.
              </p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-img-container">
              <img src="/track_debt.png" alt="" className="feature-img" />
            </div>
            <div className="feature-text-container">
              <h1 className="feature-title">Manage debt</h1>
              <p className="feature-description">
                Track who you owe or owes you, the repayment history, when to
                repay or expect a repayment.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* currency converter */}
      <div className="exchange-container">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/money-exchange-illustration-download-in-svg-png-gif-file-formats--currency-app-service-e-wallet-digital-exchanger-pack-people-illustrations-4494365.png"
          alt="cashlens logo"
          className="exchange-img"
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
              <option value={currency.currency}>{currency.name}</option>
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
              <option value={currency.currency}>{currency.name}</option>
            ))}
          </select>
          <button onClick={fetchExchange} className="login-btn">
            {loading ? "loading..." : "Convert Now"}
          </button>
          {loading && <CircularProgress />}
          {exchangeResult && (
            <div className="exchange-results-container">
              <div className="key-value-container" key={1}>
                <span className="info-key">Conversion rate</span>
                <span className="info-value">
                  {exchangeResult?.conversion_rate}
                </span>
              </div>
              <div className="key-value-container" key={2}>
                <span className="info-key">Conversion results</span>
                <span className="info-value">
                  {format_currency(
                    exchangeResult?.conversion_result,
                    currencies[exchangeData.toIndex]?.locale,
                    currencies[exchangeData.toIndex]?.currency
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* about us */}
      <div className="about-container">
        <h1 className="about-title">About cashlens</h1>
        <div className="about">
          <div className="about-card" key="about-1">
            <BsSun className="card-icon" />
            <h1 className="about-card-title">Our mission is to: </h1>
            <p className="about-card-info">
              empower individuals with user-friendly financial tools, fostering
              financial literacy, and guiding them to achieve lasting financial
              well-being.
            </p>
          </div>
          <div className="about-card" key="about-2">
            <PiBinocularsThin className="card-icon" />
            <h1 className="about-card-title">Our vision is to: </h1>
            <p className="about-card-info">
              be a global leader in revolutionizing personal finance management,
              making financial empowerment accessible to everyone.
            </p>
          </div>

          <div className="about-card" key="about-3">
            <MdGroupWork className="card-icon" />
            <h1 className="about-card-title">Our core values include: </h1>
            <div className="about-card-info">
              Empowerment, Transparency, Innovation, Accessibility and Integrity
            </div>
          </div>
          <div className="about-card" key="about-4">
            <MdOutlinePolicy className="card-icon" />
            <h1 className="about-card-title">Our policy: </h1>
            <p className="about-card-info">
              We prioritize your data security. cashlens collects minimal
              personal information strictly for app functionality. We do not
              share or sell your data.
            </p>
          </div>
        </div>
      </div>

      {/* contact us */}
      <div className="contact-container">
        <h1 className="contact-heading">Let's get in touch!</h1>
        <div className="contact">
          <div className="contact-left-container">
            <div className="contact-info" key="contact-1">
              <div className="icon-container">
                <Phone className="contact-icons" />
              </div>
              <a href="tel:+233544006865" className="contact-value">
                0544006865
              </a>
            </div>
            <div className="contact-info" key="contact-2">
              <div className="icon-container">
                <WhatsApp className="contact-icons" />
              </div>
              <a href="https://wa.me/233544006865" className="contact-value">
                0544006865
              </a>
            </div>
            <div className="contact-info" key="contact-3">
              <div className="icon-container">
                <YouTube className="contact-icons" />
              </div>
              <a
                href="https://www.youtube.com/@cashlens"
                className="contact-value"
              >
                Watch tutorials
              </a>
            </div>
            <div className="contact-info" key="contact-4">
              <div className="icon-container">
                <MailOutline className="contact-icons" />
              </div>
              <a href="mailto:mycashlens@gmail.com" className="contact-value">
                mycashlens@gmail.com
              </a>
            </div>
          </div>
          <div className="contact-form-container">
            <h1 className="login-text contact-title">Message us</h1>
            <input
              type="text"
              placeholder="jonsnow@gmail.com"
              className="contact-input"
            />
            <input
              type="text"
              placeholder="SUBJECT"
              className="contact-input"
            />
            <textarea
              className="contact-input"
              cols="30"
              rows="10"
              placeholder="Your message"
            ></textarea>
            <button className="login-btn">send</button>
          </div>
        </div>
      </div>
      {/* referral */}
      <div className="referral-container">
        <img src={img} alt="" className="referral-img" />
        <div className="referral-details">
          <h1 className="referral-title">
            What if you could earn money just by telling others about cashlens?
          </h1>
          <p className="referral-info">
            Yeah, that's what cashlens offers you! For every friend you refer to
            the app that helps you manage your money, you get a commission. The
            more you share, the more you earn. It's a win-win situation. So what
            are you waiting for?
          </p>
          <div className="intro-nav-links">
            <Link to="/register" className="intro-nav-btn">
              Join now!
            </Link>
            <Link to="/policy" className="intro-nav-btn">
              Learn more.
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
