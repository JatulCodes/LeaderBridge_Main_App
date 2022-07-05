import React from "react";
import "./LeaderBridgePricing.scss";
import DownloadImage from "../../../Assets/Images/download.png";
import AppImage from "../../../Assets/Images/app.png";
import GoogleImage from "../../../Assets/Images/google.png";
import { NavLink } from "react-router-dom";
export default function LeaderBridgePricing() {
  return (
    <>
      <section className="leader-pricing-section-align">
        <div className="container">
          <div className="title-text">
            <h1>
              LeaderBridge<sup>TM</sup> Pricing
            </h1>
            <h3>Free to join:</h3>
            <div className="home-list-alignment">
              <div>
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="css-i6dzq1"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <p>
                  We've launched our beta offering and we welcome you to
                  experience our platform completely free. You will not be asked
                  for any payment information when you sign up. in return, we'd
                  love to hear your feedback on how we could bring you a better
                  experience from time to time.
                </p>
              </div>
            </div>

            <div className="button-center">
              <NavLink to="/signup">
                <button className="fill-button">Sign Up</button>
              </NavLink>
            </div>
          </div>
          <div className="download-grid">
            <div className="download-grid-items">
              <img src={DownloadImage} alt="DownloadImage" />
            </div>
            <div className="download-grid-items">
              <h2>
                Download the LeaderBridge<sup>TM</sup> app now
              </h2>
              <div className="image-alignment">
                <img
                  src={AppImage}
                  style={{ cursor: "pointer" }}
                  alt="AppImage"
                  onClick={() =>
                    window.open(
                      "https://apps.apple.com/tt/app/leaderbridge/id1555917945"
                    )
                  }
                />
                <img
                  src={GoogleImage}
                  alt="GoogleImage"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=sutechs.leader_bridge"
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
