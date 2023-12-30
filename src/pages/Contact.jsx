import "../styles/contact.css";
import Topbar from "../components/Topbar";
import { MailOutline, Phone, WhatsApp, YouTube } from "@mui/icons-material";

const Contact = () => {
  return (
    <div className="main-container">
      <Topbar />
      <div className="contact-intro">
        <h1 className="heading-text">Contact us!</h1>
        <p className="subheading-text">
          Have questions, suggestions, or just want to say hello? We'd love to
          hear from you! Your feedback matters to us!
        </p>
      </div>
      <div className="contact-main-container">
        <div className="contact-sub-container">
          <div className="contact-left-container">
            <h1 className="login-text">Let's get in touch</h1>
            <div className="contact-info">
              <div className="icon-container">
                <Phone />
              </div>
              <a href="tel:+233544006865" className="contact-value">
                0544006865
              </a>
            </div>
            <div className="contact-info">
              <div className="icon-container">
                <WhatsApp />{" "}
              </div>
              <a href="https://wa.me/233544006865" className="contact-value">
                0544006865
              </a>
            </div>
            <div className="contact-info">
              <div className="icon-container">
                <YouTube />
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
                <MailOutline />
              </div>
              <a href="mailto:mycashlens@gmail.com" className="contact-value">
                mycashlens@gmail.com
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            <h1 className="login-text">Message us</h1>
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
            <button className="login-btn">send </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
