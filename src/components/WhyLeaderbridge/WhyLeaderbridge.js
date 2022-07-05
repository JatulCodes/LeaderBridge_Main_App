import React, { useEffect } from "react";
import "./WhyLeaderbridge.scss";
import AnonymityImage from "../../Assets/Images/ano.svg";
import FlexibilityImage from "../../Assets/Images/flex.svg";
import FreeTrialImage from "../../Assets/Images/free-trial.svg";
import PrivacyImage from "../../Assets/Images/privacy.svg";
import { useHistory } from "react-router-dom";
export default function WhyLeaderbridge() {
  const router = useHistory();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <section className="children-page-align why-leader-section">
        <div className="container">
          <div className="title-text">
            <h1>
              Why LeaderBridge<sup>TM</sup>
            </h1>
          </div>
          <div className="why-us-grid">
            <div className="why-us-grid-items">
              <img src={AnonymityImage} alt="AnonymityImage" />
            </div>
            <div className="why-us-grid-items">
              <h3>Anonymity</h3>
              <p>
                <span>Anonymity</span> allows you to bring up subjects that you
                might otherwise be unwilling to discuss with an external peer.
                [If it is in fact programmed in, include the following
                parenthetical content.] (LeaderBridge<sup>TM</sup> is programmed
                to avoid connecting you with others in your own company).
              </p>
              <p>
                Yes, you do fill out a member profile (without your name or your
                organization’s name), but only as much of it as you are
                comfortable with; and you can later modify how much of it to
                display—or whether to display any of it—when you ask a question,
                seek a connection, or respond to another member’s request.
              </p>
              <p>
                When exchanging messages with another member, you further manage
                your risk by deciding whether or not you’re willing to share
                additional information about yourself, your circumstance, or the
                issue you’re discussing. You can also decide at some point if
                you’ve reached a sufficient level of trust to suggest mutually
                disclosing your identities.
              </p>
            </div>
          </div>
          <div className="why-us-grid-first">
            <div className="why-us-grid-items">
              <h3>Flexibility</h3>
              <p>
                <span>Flexibility</span> is built-in to LeaderBridge
                <sup>TM</sup>. You can connect by asking a question that goes
                out to all members (not including members of your own
                organization) or you can narrow the pool of recipients down to
                only those who meet your criteria in terms of their main subject
                areas of interest, position title, size of company, region,
                gender, and other attributes. You can also choose to connect
                with individuals by stating a topic of discussion rather than
                asking a specific question.
              </p>
              <p>
                When you receive responses, you choose which ones to follow up
                with. And you can discontinue the exchange of messages at any
                time with any or all of your respondents.
              </p>
            </div>
            <div className="why-us-grid-items right-image">
              <img src={FlexibilityImage} alt="FlexibilityImage" />
            </div>
          </div>
          <div className="why-us-grid">
            <div className="why-us-grid-items">
              <img src={FreeTrialImage} alt="FreeTrialImage" />
            </div>
            <div className="why-us-grid-items">
              <h3>Free trial</h3>
              <div className="home-list-alignment">
                <div>
                  <p>
                    We've launched our beta offering and we welcome you to
                    experience our platform completely free. You will not be
                    asked for any payment information when you sign up. in
                    return, we'd love to hear your feedback on how we could
                    bring you a better experience from time to time.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="why-us-grid-first">
            <div className="why-us-grid-items">
              <h3>Privacy</h3>
              <p>
                <span>Privacy</span> Your personal information is protected,
                with your name and your organization’s name available only to
                LeaderBridge<sup>TM</sup> administrators. LeaderBridge
                <sup>TM</sup> will not sell or share your information. Records
                of your discussions with others are only saved in your own files
                and the files of respondents involved in those specific
                discussions.
              </p>
              <p>
                If at any time you choose to mutually disclose identities with
                another member, you can continue your discussions outside of
                LeaderBridge<sup>TM</sup> .
              </p>
              <button
                className="fill-button"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </button>
            </div>
            <div className="why-us-grid-items right-image">
              <img src={PrivacyImage} alt="PrivacyImage" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
