import React, { useContext, useEffect, useState } from "react";
import "./landingPage.scss";
import NewHeroImage from "../../Assets/Images/new-hero.png";
import FlagIcon from "../../Assets/Images/flag-icon.png";
import MettingImage from "../../Assets/Images/targeted-section-new.jpg";
import DualPhoneImage from "../../Assets/Images/dual-phone.png";
import AppButtonImage from "../../Assets/Images/app-button.png";
import GooglePayImage from "../../Assets/Images/google-pay.png";
import TargetedSectionImage from "../../Assets/Images/targeted-section.jpg";
import LeafIcon from "../../Assets/Images/leaf.png";
import FeedbackIcon from "../../Assets/Images/feedback.png";
import { NavLink, useHistory } from "react-router-dom";
import { DataLoaded } from "../../App";
import UpdateHeader from "../Layout/UpdateHeader/UpdateHeader";
export default function LandingPage() {
  const { scrollDownData } = useContext(DataLoaded);
  const Router = useHistory();
  const [scrollDown, setScrollDown] = scrollDownData;

  const [newMobileSidebar, setNewMobileSidebar] = useState(false);

  useEffect(() => {
    window.scrollTo(1, document.body.scrollHeight);
    window.scrollTo({ behavior: "smooth" });
  }, [scrollDown]);

  window.onload = function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const HandleLogout = async (e) => {
    e.preventDefault();
    await Router.replace("/");
    setScrollDown(Math.random());
  };

  return (
    <div>
      {newMobileSidebar && <div className="new-mobile-blur-wrapper"></div>}

      <div
        className={
          newMobileSidebar
            ? "new-mobile-sidebar-design new-mobile-sidebar-show"
            : "new-mobile-sidebar-design new-mobile-sidebar-hidden"
        }
      >
        <div className="mobile-new-sidebar-header">
          <div className="logo">
            <a href="/">
              <img src="https://www.leaderbridge.com/static/media/logo.6e11d3b2.png" />
              <span>LeaderBridge</span>
            </a>
          </div>
          <i
            onClick={() => setNewMobileSidebar(!newMobileSidebar)}
            className="fa-solid fa-xmark"
          ></i>
        </div>
        <div className="new-mobile-body-alignment">
          <a>
            {" "}
            <NavLink to="/new-how-it-works">How It Works</NavLink>
          </a>

          <a>
            {" "}
            <NavLink to="/new-pricing">Pricing</NavLink>
          </a>

          <a>
            <NavLink to="/new-about">About</NavLink>
          </a>

          <a>
            <NavLink to="/new-contact">Contact</NavLink>
          </a>

          <a>
            <NavLink to="/" onClick={(e) => HandleLogout(e)}>
              Get The App
            </NavLink>
          </a>
          <NavLink to={"/signin"}>Login</NavLink>
        </div>
      </div>
      <>
        <>
          <UpdateHeader />
        </>
      </>
      <div className="container-md">
        <div className="lading-page-banner">
          <div className="new-hero-section-alignment">
            <div className="container-md">
              <div className="grid">
                <div className="grid-items">
                  <h1>
                    Start-up Founders <br />
                    You're not alone anymore
                  </h1>
                  <p>
                    Now you can get advice from other founders who have been
                    there!
                  </p>

                  {/* <NavLink to={"/signup"}> */}
                    {/* <div className="signup-button-center-alignment">
                      <a target="_blank" href="/signup">
                        <button>Join Now</button>
                      </a>
                    </div>
                  </NavLink> */}
                </div>
                <div className="grid-items">
                  {/* <img src={NewHeroImage} alt="NewHeroImage" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="ceo-section-alignment">
        <div className="container-md">
          <div className="text-grid">
            <div className="text-grid-items">
              <span>LeaderBridge</span>
            </div>
            <div className="text-grid-items">
              <p>
                LeaderBridge enables founders and CEOs to ask and answer
                questions of one another either publicly or<a> anonymously</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="three-box-center-alignment">
        <div className="container-md">
          <div className="grid">
            <div className="grid-items">
              <div className="icon-center-alignment">
                <img src={FlagIcon} alt="FlagIcon" />
              </div>
              <h2>Beat Start-up Challenges</h2>
              <p>
                Building a startup or running an early stage company is one
                challenge after another - and each challenge is something you
                haven't seen before. You may have people in your circle who can
                help you, but what if you have to keep it confidential or if not
                then they may not always have the answers.
              </p>
            </div>
            <div className="grid-items">
              <div className="icon-center-alignment">
                <img src={LeafIcon} alt="LeafIcon" />
              </div>
              <h2>Tackle Sensitive Issues</h2>
              <p>
                Your issue may be sensitive and you don't want to discuss it
                with someone you know. Or, you don't know anyone who has dealt
                with the issue before and you are not comfortable asking for a
                referral since you would have to disclose at least some
                information.
              </p>
            </div>
            <div className="grid-items">
              <div className="icon-center-alignment">
                <img src={FeedbackIcon} alt="FeedbackIcon" />
              </div>
              <h2>Get Diverse Feedback</h2>
              <p>
                Maybe you need to get feedback from people of widely different
                backgrounds. LeaderBridge also allows you to expand your
                perspective on your problems and solutions with unbiased peers.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="journey-section-alignment">
        <div className="container-md">
          <div className="journey-box-design">
            <div className="grid">
              <div className="grid-items">
                <h2>
                  The journey of founding a start-up no longer needs to be a
                  lonely place.
                </h2>
              </div>
              <NavLink to={"/signup"}>
                <div className="grid-items">
                  <a target="_blank" href="/signup">
                    <button>Sign Up</button>
                  </a>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </section> */}
      <section className="left-side-content-side">
        <div className="grid">
          <div className="grid-items">
            <h1>
              A <a> Different</a> type of platform for <br />
              founders to find their match
            </h1>
            <div className="text-grid">
              <div className="text-grid-items">
                <i class="fa-solid fa-minus"></i>
              </div>
              <div className="text-grid-items">
                <p>
                  No sales, spam, job hunting or recruiting – just questions,
                  discussion and advice from founder-to-founder.
                </p>
              </div>
            </div>
            <div className="text-grid">
              <div className="text-grid-items">
                <i class="fa-solid fa-minus"></i>
              </div>
              <div className="text-grid-items">
                <p>
                  Every member is carefully vetted – only real Founders, CEOs,
                  and C-Suite executives.
                </p>
              </div>
            </div>
            <div className="text-grid">
              <div className="text-grid-items">
                <i class="fa-solid fa-minus"></i>
              </div>
              <div className="text-grid-items">
                <p>
                  You can ask and answer anonymously – protect your new idea,
                  company identity, personal identity and location, if you wish.
                </p>
              </div>
            </div>
          </div>
          <div className="grid-items">
            <img src={MettingImage} alt="MettingImage" />
          </div>
        </div>
      </section>
      <section className="anonymity-section-alignment">
        <div className="container-md">
          <div className="grid">
            <div className="grid-items">
              <img src={DualPhoneImage} alt="DualPhoneImage" />
            </div>
            <div className="grid-items">
              <h2>Anonymity </h2>
              <p>
                Our research has shown that there are many reasons leaders want
                to be anonymous when asking questions of others. So, we designed
                LeaderBridge to put you in control of how much, and to whom, you
                reveal information. We require information about you and your
                organization when you create an account that we use for vetting
                and to maintain the integrity of the platform. All of your
                information is confidential and secured. And we don’t share or
                sell your information. Period.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="right-side-content-side">
        <div className="grid">
          <div className="grid-items">
            <img src={TargetedSectionImage} alt="TargetedSectionImage " />
          </div>
          <div className="grid-items">
            <h1>Targeted Queries</h1>
            <h4>
              Send your question to exactly the people you want to get answers
              from based on criteria such as
            </h4>
            <div className="text-grid">
              <div className="text-grid-items">
                <i class="fa-solid fa-minus"></i>
              </div>
              <div className="text-grid-items">
                <p>Company size</p>
              </div>
            </div>
            <div className="text-grid">
              <div className="text-grid-items">
                <i class="fa-solid fa-minus"></i>
              </div>
              <div className="text-grid-items">
                <p>Subject area</p>
              </div>
            </div>
            <div className="text-grid">
              <div className="text-grid-items">
                <i class="fa-solid fa-minus"></i>
              </div>
              <div className="text-grid-items">
                <p>Position/title</p>
              </div>
            </div>
            <div className="text-grid">
              <div className="text-grid-items">
                <i class="fa-solid fa-minus"></i>
              </div>
              <div className="text-grid-items">
                <p>Region</p>
              </div>
            </div>
            <div className="text-grid">
              <div className="text-grid-items">
                <i class="fa-solid fa-minus"></i>
              </div>
              <div className="text-grid-items">
                <p>Gender</p>
              </div>
            </div>
            <div className="text-grid">
              <div className="text-grid-items">
                <i class="fa-solid fa-minus"></i>
              </div>
              <div className="text-grid-items">
                <p>Everyone, except people in your organization</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="download-app-alignment">
        <div className="container-md">
          <div className="app-bg">
            <h1>Download the App Now</h1>
            <div>
              <img
                src={GooglePayImage}
                alt="GooglePayImage"
                onClick={() =>
                  window.open(
                    "https://play.google.com/store/apps/details?id=sutechs.leader_bridge"
                  )
                }
              />
              <img
                src={AppButtonImage}
                alt="AppButtonImage"
                onClick={() =>
                  window.open(
                    "https://apps.apple.com/tt/app/leaderbridge/id1555917945"
                  )
                }
              />
            </div>
          </div>
        </div>
      </section>
      <div className="join-leaderbridge">
        <div className="container-md">
          <div className="content-alignment">
            <div>
              <h1>Join LeaderBridge and Get Advice from Your Peers</h1>
            </div>
            <div>
              <a target="_blank" href="/signup">
                <button>Join Now</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
