import React from "react";
import { NavLink } from "react-router-dom";
import "./newFooter.scss";
export default function NewFooter() {
  return (
    <div>
      <div className="new-footer-design">
        <div className="container-md">
          <div className="footer-new-grid">
            <div className="footer-new-grid-items">
              <div className="update-footer-logo-alignment">
                <img src="https://www.leaderbridge.com/static/media/logo.6e11d3b2.png" />
                <h3>LeaderBridge</h3>
              </div>
              <div className="text-grid">
                <div className="text-grid-items">
                  <div className="icon-text">
                    {/* <div>
                      <i class="fa-solid fa-phone"></i>
                    </div> */}
                    {/* <div>
                      <span>Phone</span>
                    </div> */}
                  </div>
                </div>
                {/* <div className="text-grid-items">
                  <a>999-888-4567</a>
                </div> */}
              </div>
              <div className="text-grid">
                <div className="text-grid-items">
                  <div className="icon-text">
                    <div>
                      <i class="fa-solid fa-envelope"></i>
                    </div>
                    <div>
                      <span>Email</span>
                    </div>
                  </div>
                </div>
                <div className="text-grid-items">
                  <a> support@leaderbridge.com</a>
                </div>
              </div>
              <div className="text-grid">
                <div className="text-grid-items">
                  <div className="icon-text">
                    <div>
                      <i class="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                      <span>Address</span>
                    </div>
                  </div>
                </div>
                <div className="text-grid-items">
                  <a>
                    {" "}
                    John Behr Group, LLC, 225 West Washington Street, Suite
                    2200, Chicago, IL 60606, United States
                  </a>
                </div>
              </div>
              <div className="social-footer-alignment">
                <a
                  href="https://m.facebook.com/leaderbridge/?ref=py_c"
                  target="_blank"
                >
                  <div>
                    <i class="fa-brands fa-facebook-f"></i>
                  </div>
                </a>

                {/* <div>
                  <i class="fa-brands fa-twitter"></i>
                </div> */}
                {/* <div>
                  <i class="fa-brands fa-pix"></i>
                </div> */}
                <a
                  href="https://www.instagram.com/leaderbridge1/"
                  target="_blank"
                >
                  <div>
                    <i class="fa-brands fa-instagram"></i>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/company/leader-bridge"
                  target="_blank"
                >
                  <div>
                    <i class="fa-brands fa-linkedin-in"></i>
                  </div>
                </a>
              </div>
            </div>
            <div className="footer-new-grid-items">
              <h2>Headings</h2>

              <NavLink to={"/new-about"}>– About Us</NavLink>
              {/* <a href="/about"> – About Us</a> */}
              {/* <a>– Testimonials</a> */}
              {/* <a href="/contact" target="_blank"> */}
              <NavLink to={"/new-contact"}>– Contact Us</NavLink>
              {/* </a> */}
              <a>– Cookie Policy</a>
            </div>
            <div className="footer-new-grid-items">
              <h2>Experties</h2>
              <NavLink to={"/new-how-it-works"}>– How It Works</NavLink>
              <NavLink to={"/new-pricing"}>– Pricing</NavLink>
              {/* <a href="/new-how-it-works">– How It Works</a>
              <a href="/new-pricing">– Pricing</a> */}
              <a
                href="https://play.google.com/store/apps/details?id=sutechs.leader_bridge"
                target="_blank"
              >
                – Get the App
              </a>
              <a href="/signin">– Login</a>
            </div>
            {/* <div className="footer-new-grid-items">
              <h2>Subscriptions</h2>
              <a>– Blog and Press</a>
              <a>– Listings</a>
            </div> */}
          </div>
        </div>
      </div>
      <div className="sub-footer-design">
        <div className="container-md">
          <div className="sub-footer-alignment">
            <div>
              <p>LeaderBridgeTM © 2022-2023. All Rights Reserved.</p>
            </div>
            <div>
              <a href="/privacy" target="_blank">
                Privacy Policy
              </a>
              <a href="/terms" target="_blank">
                Terms of Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
