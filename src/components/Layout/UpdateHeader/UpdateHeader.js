import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { DataLoaded } from "../../../App";
import "./UpdateHeader.scss";
export default function UpdateHeader() {
  const Router = useHistory();
  // const [isLogin, setIsLogin] = useState(false);
  const { scrollDownData } = useContext(DataLoaded);
  const [newMobileSidebar, setNewMobileSidebar] = useState(false);

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
  // window.onload = function () {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // };
  // useEffect(() => {
  //   if (localStorage.getItem("userData") && localStorage.getItem("token")) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, [isLogin]);
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
      <div className="update-header-alignment">
        <div className="container-md">
          <div className="header-first-section-alignment">
            <div className="infor">
              <div className="border-right-alignment">
                {/* <div>
                  <i class="fa-solid fa-phone"></i>
                </div> */}
                {/* <div>
                  <span> Phone Number: 01 444 22 4444 22 </span>
                </div> */}
              </div>
              <div className="email-left-alignment">
                <div>
                  <i class="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <span> Email ID: support@leaderbridge.com</span>
                </div>
              </div>
            </div>
            <div className="social-media">
              <a
                href="https://m.facebook.com/leaderbridge/?ref=py_c"
                target="_blank"
              >
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              {/* <a href="" target="_blank">
                <i class="fa-brands fa-twitter"></i>
              </a> */}
              <a
                href="https://www.instagram.com/leaderbridge1/"
                target="_blank"
              >
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/leader-bridge
 "
                target="_blank"
              >
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="new-header-design">
          <div className="container-md">
            <div className="new-header-alignment">
              <div className="logo">
                <a href="/">
                  <img src="https://www.leaderbridge.com/static/media/logo.6e11d3b2.png" />
                  <span>LeaderBridge</span>
                </a>
              </div>
              <div className="new-menu">
                {/* <a></a> */}
                <NavLink
                  to="/new-how-it-works"
                  className={
                    Router.location.pathname == "/new-how-it-works"
                      ? "activeTab"
                      : ""
                  }
                >
                  How It Works
                </NavLink>
                <NavLink
                  to="/new-pricing"
                  className={
                    Router.location.pathname == "/new-pricing"
                      ? "activeTab"
                      : ""
                  }
                >
                  Pricing
                </NavLink>
                <NavLink
                  to="/new-about"
                  className={
                    Router.location.pathname == "/new-about" ? "activeTab" : ""
                  }
                >
                  About
                </NavLink>
                <NavLink
                  to="/new-contact"
                  className={
                    Router.location.pathname == "/new-contact"
                      ? "activeTab"
                      : ""
                  }
                >
                  Contact
                </NavLink>
                <NavLink to="/" onClick={(e) => HandleLogout(e)}>
                  Get The App
                </NavLink>
                {/* <a>Get The App</a> */}
                {/* <div className="login-button-alignment-design">
                  <button>Login</button>
                </div> */}
                <NavLink
                  to="/signin"
                  className={
                    Router.location.pathname == "/landingpage"
                      ? "activeTab"
                      : ""
                  }
                >
                  Login
                </NavLink>
              </div>
              <div
                className="update-header-menu"
                onClick={() => setNewMobileSidebar(!newMobileSidebar)}
              >
                <i class="fa-solid fa-bars"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
