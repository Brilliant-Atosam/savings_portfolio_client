import { Link } from "react-router-dom";
import "../styles/homepage.css";
import "../styles/contact.css";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { GoGoal } from "react-icons/go";
import logo from "../logo1.png";
import { FcDebt } from "react-icons/fc";
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
        <h1 className="intro-heading">Welcome to cashlens!</h1>
        <p className="intro-text">
          Cashlens is your all-in-one financial companion, showing you exactly
          what's coming in from where, what's going out to where, and where to
          focus, track and thrive!
        </p>
        <div className="intro-nav-links">
          <Link to="/register" className="intro-nav-btn">
            Create account
          </Link>
          <Link to="/login" className="intro-nav-btn">
            Log in
          </Link>
        </div>
      </div>
      {/* features */}
      <div className="features-container">
        <h1 className="features-title">With cashlens you can:</h1>
        <div className="features">
          <div className="features-card">
            <GiReceiveMoney className="card-icon" />
            <h1 className="feature-card-title">Track your income</h1>
            <p className="feature-card-info">
              Monitor all earnings, from paychecks to side gigs to gifts. Know
              where your money comes from and how much.
            </p>
          </div>
          <div className="features-card">
            <GiPayMoney className="card-icon" />
            <h1 className="feature-card-title">Track your expenses</h1>
            <p className="feature-card-info">
              Categorize and control spending. Know where your money goes for
              smarter budgeting.
            </p>
          </div>
          <div className="features-card">
            <GoGoal className="card-icon" />
            <h1 className="feature-card-title">Track your savings</h1>
            <p className="feature-card-info">
              Achieve dreams with personalized savings plans. Set, track, and
              realize financial goals.
            </p>
          </div>
          <div className="features-card">
            <FcDebt className="card-icon" />
            <h1 className="feature-card-title">Manage debt</h1>
            <p className="feature-card-info">
              Break free from debt stress. Manage and track debts for a clear
              path to financial freedom.
            </p>
          </div>
        </div>
        <Link to="/login" className="intro-nav-btn">
          Get Started
        </Link>
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
      {/* about us */}
      <div className="about-container">
        <h1 className="about-title">About cashlens</h1>
        <div className="about">
          <div className="about-card">
            <BsSun className="card-icon" />
            <h1 className="about-card-title">Our mission is to: </h1>
            <p className="about-card-info">
              empower individuals with user-friendly financial tools, fostering
              financial literacy, and guiding them to achieve lasting financial
              well-being.
            </p>
          </div>
          <div className="about-card">
            <PiBinocularsThin className="card-icon" />
            <h1 className="about-card-title">Our vision is to: </h1>
            <p className="about-card-info">
              be a global leader in revolutionizing personal finance management,
              making financial empowerment accessible to everyone.
            </p>
          </div>

          <div className="about-card">
            <MdGroupWork className="card-icon" />
            <h1 className="about-card-title">Our core values include: </h1>
            <div className="about-card-info">
              Empowerment, Transparency, Innovation, Accessibility and Integrity
            </div>
          </div>
          <div className="about-card">
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
      {/* currency converter */}
      <div className="exchange-container">
        <div className="login-form-container">
          <img src={logo} alt="cashlens logo" className="login-logo" />
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
      {/* contact us */}
      <div className="contact-container">
        <h1 className="contact-heading">Let's get in touch!</h1>
        <div className="contact">
          <div className="contact-left-container">
            <div className="contact-info">
              <div className="icon-container">
                <Phone className="contact-icons" />
              </div>
              <a href="tel:+233544006865" className="contact-value">
                0544006865
              </a>
            </div>
            <div className="contact-info">
              <div className="icon-container">
                <WhatsApp className="contact-icons" />
              </div>
              <a href="https://wa.me/233544006865" className="contact-value">
                0544006865
              </a>
            </div>
            <div className="contact-info">
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
            <div className="contact-info">
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

      <footer>
        cashlens &copy; 2024. Created by
        <a href="tel:233544006865">webcrony online</a>
      </footer>
    </div>
  );
};

export default Homepage;
