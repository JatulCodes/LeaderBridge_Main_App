import React, { useEffect } from "react";
import UpdateHeader from "../Layout/UpdateHeader/UpdateHeader";
import "./newAbout.scss";
import StoryImage from "../../Assets/Images/story-image.jpg";
export default function NewAbout() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      // behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <>
        <UpdateHeader />
      </>
      <div className="container">
        <div className="new-about-banner">
          <div className="page-content-alignment">
            <h1>About Us</h1>
            <p>Know more about Us </p>
            {/* <a href="/signup">
              <button>Sign Up</button>
            </a> */}
          </div>
        </div>
      </div>
      <div className="new-leaderbridge-story-alignment">
        <div className="container">
          <div className="grid">
            <div className="grid-items">
              <img src={StoryImage} alt="StoryImage" />
            </div>
            <div className="grid-items">
              <h2>The LeaderBridge Story</h2>
              <p>
                For more than 30 years our founder has coached founders, CEOs
                and senior level executives across a wide range of industries,
                company sizes, and experience levels.
              </p>
              <p>
                One of his most effective tools was connecting clients to peers
                who have experience or skills in an area critical to the client
                at that moment. But some clients were reluctant to talk with
                another leader, even though they understood the benefits,
                because they did not want to reveal themselves to someone in
                their area, expose what they were working on, or tell someone
                else what the issue was.
              </p>
              <p>
                LeaderBridge is the online version of these personal
                introductions, with a twist – the parties can remain anonymous,
                so there are no risks.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="join-leaderbridge">
        <div className="container-md">
          <div className="content-alignment">
            <div>
              <h1>Join LeaderBridge And Get The Advice You Need</h1>
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
