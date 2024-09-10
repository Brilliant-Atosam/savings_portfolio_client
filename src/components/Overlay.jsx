import React from "react";
import Subscription from "./Subscription";

const Overlay = () => {
  return (
    <div className="overlay">
      <h1 className="overlay-text">
        Premium access required. Please subscribe to gain full access.
      </h1>
      <p className="overlay-text">
        You can also watch a 30 - 60 seconds ad to temporary unlock premium
        access
      </p>
      <div className="overlay-action-container">
        <Subscription /> <button className="subscribe-btn">Watch Ad</button>
      </div>
    </div>
  );
};

export default Overlay;
