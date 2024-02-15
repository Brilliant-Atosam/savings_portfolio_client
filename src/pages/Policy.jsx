import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "../styles/homepage.css";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { TfiUnlink } from "react-icons/tfi";
import { GiTakeMyMoney, GiCash } from "react-icons/gi";

import { MdOutlinePolicy } from "react-icons/md";
const Policy = () => {
  return (
    <div className="main-container">
      <Navbar />
      <div className="intro-container">
        <h1 className="intro-heading">Welcome!</h1>
        <p className="intro-text">
          At cashlens, we believe in sharing the financial growth! Join our
          Referral/Partnership Program and earn exciting commissions for every
          successful sign-up through your referral link.
        </p>
        <div className="intro-nav-links">
          <Link to="/login" className="intro-nav-btn">
            Join now!
          </Link>
        </div>
      </div>
      <div className="features-container">
        <h1 className="features-title">How the Referral Program works</h1>
        <div className="features">
          <div className="features-card">
            <FaPersonCircleQuestion className="card-icon" />
            <h1 className="feature-card-title">Who is eligible?</h1>
            <p className="feature-card-info">
              To participate in the cashlens Partnership/referral program,
              individuals must be registered and subscribed cashlens users
            </p>
          </div>
          <div className="features-card">
            <TfiUnlink className="card-icon" />
            <h1 className="feature-card-title">Referral Link Usage</h1>
            <p className="feature-card-info">
              Referral links must be shared in compliance with ethical and legal
              standards. Any form of spam or misleading promotion is strictly
              prohibited.
            </p>
          </div>
          <div className="features-card">
            <GiTakeMyMoney className="card-icon" />
            <h1 className="feature-card-title">Commission</h1>
            <p className="feature-card-info">
              Commissions are earned only for successful sign-ups resulting in
              active subscriptions. Direct Referrals: 40% first-year
              subscription, 25% ongoing. Indirect Referrals: 15% first-year
              subscription, 3% ongoing (2nd level).
            </p>
          </div>
          <div className="features-card">
            <GiCash className="card-icon" />
            <h1 className="feature-card-title">Payment</h1>
            <p className="feature-card-info">
              Partners can track their earnings on their partnership dashboard
              where they can request for withdrawal and they will be credited
              within 24 hours.
            </p>
          </div>
        </div>
      </div>
      <div className="referral-container reverse">
        <MdOutlinePolicy className="referral-img policy-icon" />
        <div className="referral-details">
          <h1 className="referral-title">
            To ensure safe use of this partnership program,
          </h1>
          <p className="referral-info">
            Any attempt to manipulate or abuse the referral system will result
            in disqualification and may lead to account suspension.
          </p>
          <p className="referral-info">
            cashlens reserves the right to modify or terminate the referral
            program at any time, with or without prior notice.
          </p>
        </div>
      </div>
      <footer>
        cashlens &copy; 2024. Created by
        <a href="tel:233544006865">webcrony online</a>
      </footer>
    </div>
  );
};

export default Policy;
