import React, { useContext, useEffect } from "react";
import { DataLoaded } from "../../App";
// import { ToastContainer, toast } from "react-toastify";
import "../home/home.scss";
import Features from "./Features/Features";
import LeaderBridgePlatform from "./LeaderBridgePlatform/LeaderBridgePlatform";
import LeaderBridgePricing from "./LeaderBridgePricing/LeaderBridgePricing";
export default function Home(props) {
  const { scrollDownData } = useContext(DataLoaded);

  const [scrollDown, setScrollDown] = scrollDownData;
  console.log(scrollDown, "qrqrqqrqrqrqrq");
  // if (scrollDown == true && props.location.pathname == "/") {
  //   window.scrollTo(1, document.body.scrollHeight);
  //   window.scrollTo({ behavior: "smooth" });
  // }

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

  //   function scrollToBottom() {
  //     window.scrollTo(1, document.body.scrollHeight);
  //   }

  return (
    <>
      <section className="hero-banner-align">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-grid-items">
              {/* <ToastContainer /> */}
              <h1>
                LeaderBridge<sup>TM</sup>
              </h1>
              <h2>LeaderBridge TM is a unique Platform for founders:</h2>
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
                  <span>
                    LeaderBridge is a unique offering for founders to ask
                    questions anonymously, and offer advice to peers by
                    answering their questions.
                  </span>
                </div>
              </div>
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
                  <span>
                    Ask any question related to start-ups, scale-ups and
                    challenges involved with being a founder and gain fresh
                    perspectives
                  </span>
                </div>
              </div>
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
                  <span>
                    It lets you connect anonymously and stay anonymous if you
                    wish.
                  </span>
                </div>
              </div>
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
                  <span>
                    We offer an enhanced non-spammy experience because.
                  </span>
                </div>
              </div>
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
                  <span>
                    LeaderBridge does not allow sales, job hunting, or
                    recruitment.
                  </span>
                </div>
              </div>
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
                  <span>
                    We verify the professional identity of all members
                  </span>
                </div>
              </div>
            </div>
            <div className="hero-grid-items">
              <video autoPlay muted controls loop width="650" height="365">
                <source src="https://leadersbridge.s3.amazonaws.com/video/welcome_to_LeaderBridge.mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>
      <>
        <LeaderBridgePlatform />
      </>
      <>
        <Features />
      </>
      <>
        <LeaderBridgePricing />
      </>
    </>
  );
}
