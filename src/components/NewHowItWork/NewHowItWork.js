import React, { useEffect } from "react";
import UpdateHeader from "../Layout/UpdateHeader/UpdateHeader";
import "./NewHowItWork.scss";
import DualPhone from "../../Assets/Images/dual-phone.png";
import PhoneWorkImage from "../../Assets/Images/phone-work.png";
import GooglePayButton from "../../Assets/Images/primary-google.png";
import AppleStoreButton from "../../Assets/Images/apple-store.png";
import { NavLink } from "react-router-dom";
export default function NewHowItWork() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return (
    <div>
      <>
        <UpdateHeader />
      </>
      <div className="container">
        <div className="update-how-it-works-banner">
          <div className="how-it-workd-text">
            <h1>How It Works</h1>
            <p>Follow our easy 3-step process to get started </p>
            <NavLink to={"/signup"}>
              <button>Sign Up</button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="how-it-work-steper-alignment">
        <div className="container">
          <div className="account-grid">
            <div className="account-grid-items">
              <div className="right-side-alignment-round">
                <div className="stper-round-design">
                  <div className="sub-round-design">1</div>
                </div>
              </div>
              <h1>1. Set Up Your Account</h1>
              <span>- Enter your information</span>
              <span>- Your organization’s information</span>
              <span>
                - All of your information is confidential and secure - we will
                never reveal it to other members
              </span>
            </div>
            <div className="account-grid-items">
              <div className="signup-box-design">
                <h3>Sign Up</h3>
                <div className="cus-input-style">
                  <div className="label-alignment">
                    <label>Name</label>
                  </div>
                  <div className="cus-input-relative">
                    <input type="text" placeholder="John Doe" disabled />
                  </div>
                </div>
                <div className="cus-input-style">
                  <div className="label-alignment">
                    <label>Email</label>
                    <i class="fa-solid fa-circle-info"></i>
                  </div>
                  <div className="cus-input-relative">
                    <input
                      type="text"
                      placeholder="Enter your personal email"
                      disabled
                    />
                  </div>
                </div>
                <div className="cus-input-style">
                  <div className="label-alignment">
                    <label>Password</label>
                    <i class="fa-solid fa-circle-info"></i>
                  </div>
                  <div className="cus-input-relative">
                    <input type="text" placeholder="*********" disabled />
                    <div className="icon-alignment-right">
                      <i class="fa-solid fa-eye-slash"></i>
                    </div>
                  </div>
                </div>
                <div className="cus-input-style">
                  <div className="label-alignment">
                    <label>Confirm Password</label>
                    <i class="fa-solid fa-circle-info"></i>
                  </div>
                  <div className="cus-input-relative">
                    <input type="text" placeholder="*********" disabled />
                    <div className="icon-alignment-right">
                      <i class="fa-solid fa-eye-slash"></i>
                    </div>
                  </div>
                </div>
                <div className="input-checkbox-text-alignment">
                  <div>
                    <input type="checkbox" disabled />
                  </div>
                  <div>
                    <span>
                      I accept the <a>Privacy Policy , Terms of Services</a> and{" "}
                      <a>Cookies Policy </a>
                      set forth by LeaderBridge
                    </span>
                  </div>
                </div>
                <div className="signup-button-design">
                  <button>Sign Up</button>
                </div>
              </div>
            </div>
          </div>
          <div className="send-account-grid">
            <div className="send-account-grid-items">
              <img src={DualPhone} alt="DualPhone" />
            </div>
            <div className="send-account-grid-items">
              <div className="stper-round-design">
                <div className="sub-round-design">2</div>
              </div>
              <h1>2. Send A Question</h1>
              <span>- Post your question</span>
              <span>- Filter audience recipients or send to everyone</span>
              <span>- Click Submit</span>
              <span>- Get answers and interact</span>
              <span>
                - Connect with them 1-to-1 via video or voice call to dig deeper
                into challenges. You’ve found your answers!
              </span>
            </div>
          </div>
          <div className="help-other-grid">
            <div className="help-other-grid-items">
              <div className="right-side-alignment-round">
                <div className="stper-round-design">
                  <div className="sub-round-design">3</div>
                </div>
              </div>
              <h1>3. Help other founders</h1>
              <span>
                - It takes a village to raise a startup and everyone has
                something to contribute.
              </span>
              <span>
                - Take a few moments to see if you can help someone else’s
                startup by offering advice
              </span>
              <span>
                - Helping other founders with their challenges can lead to great
                connections and unexpected benefits.
              </span>
            </div>
            <div className="help-other-grid-items">
              <img src={DualPhone} alt="DualPhone" />
            </div>
          </div>
        </div>
      </div>
      <div className="app-section-alignment">
        <div className="container">
          <div className="grid">
            <div className="grid-items">
              <img src={PhoneWorkImage} alt="PhoneWorkImage" />
            </div>
            <div className="grid-items">
              <div className="app-bg-dark">
                <h1>LeaderBridge Works Via Browser And Apple/Android Apps</h1>
                <p>
                  We've launched our beta offering and we welcome you to
                  experience our platform completely free. You will not be asked
                  for any payment information when you sign up. In return, we'd
                  love to hear your feedback on how we could bring you a better
                  experience from time to time.
                </p>
                <div
                  className="primart-button-alignment"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={GooglePayButton}
                    alt="GooglePayButton"
                    onClick={() =>
                      window.open(
                        "https://play.google.com/store/apps/details?id=sutechs.leader_bridge"
                      )
                    }
                  />
                  <img
                    src={AppleStoreButton}
                    alt="AppleStoreButton"
                    onClick={() =>
                      window.open(
                        "https://apps.apple.com/tt/app/leaderbridge/id1555917945"
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="join-leaderbridge">
        <div className="container-md">
          <div className="content-alignment">
            <div>
              <h1>Its That Simple, Join Today And Get The Help You Need</h1>
            </div>
            <div>
              <a href="/signup">
                <button>Join Now</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
