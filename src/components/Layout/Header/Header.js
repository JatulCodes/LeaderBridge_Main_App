import React, { useContext, useEffect, useRef, useState } from "react";
import "./Header.scss";
import Logo from "../../../Assets/Images/logo.png";
import { NavLink, useHistory } from "react-router-dom";
import Auth from "../../../Helpers/auth";
import { ToastContainer, toast } from "react-toastify";
import { ApiGet, ApiPost } from "../../../Helpers/Api/ApiData";
import { DataLoaded } from "../../../App";
import Home from "../../home/Home";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const isAuth = Auth.isUserAuthenticated();
  const { scrollDownData } = useContext(DataLoaded);

  const [scrollDown, setScrollDown] = scrollDownData;
  const history = useHistory();
  const [CmdDesc, setCmdDesc] = useState();
  const AllCms = () => {
    ApiGet("cms/get-cms")
      .then((res) => {
        setCmdDesc(res.data.payload.Cms);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HandleLogout = async (e) => {
    e.preventDefault();
    await history.replace("/");
    setScrollDown(Math.random());
  };

  useEffect(() => {
    AllCms();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userData") && localStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const HandleLogOut = () => {
    Auth.deauthenticateUser();
    toast.success("User Signout", {
      theme: "colored",
    });
    setIsLogin(false);
  };

  return (
    <>
      <header>
        {/* <ToastContainer /> */}
        <div className="container-fluid">
          <div className="header-alignment">
            <div className="company_logo">
              <NavLink to="/">
                <img src={Logo} alt="Logo" />
                <span>LeaderBridge</span>
              </NavLink>
            </div>
            <div className="menu">
              <nav>
                <ul>
                  {CmdDesc?.map((data) => {
                    return (
                      <>
                        {data.title == "About Us" && data.isActive == true && (
                          <>
                            <NavLink to="/about">
                              <li>About</li>
                            </NavLink>
                          </>
                        )}
                      </>
                    );
                  })}

                  <NavLink to="/why-leaderbridge">
                    <li>
                      Why LeaderBridge<sup>TM</sup>
                    </li>
                  </NavLink>
                  <a href="https://blog.leaderbridge.com/" target="_blank">
                    <li>Blog</li>
                  </a>

                  <NavLink to="/">
                    <li
                      onClick={(e) => {
                        HandleLogout(e);
                      }}
                    >
                      Download App
                    </li>
                  </NavLink>
                  {/* <NavLink to="/signin">
                                        <li>Sign in</li>
                                    </NavLink> */}
                  {
                    isAuth == false ? (
                      <NavLink to="/signin">
                        <li>Sign in</li>
                      </NavLink>
                    ) : (
                      // <NavLink to="/signin">
                      <li onClick={HandleLogOut}>Signout</li>
                    )
                    // </NavLink>
                  }
                </ul>
              </nav>
              <div className="signup-button">
                {isAuth == false ? (
                  <NavLink to="/signup">
                    <button>Sign Up</button>
                  </NavLink>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
