import React, { useEffect, useState } from "react";
import "./Footer.scss";
import { NavLink } from "react-router-dom";
import { ApiGet, ApiPost } from "../../../Helpers/Api/ApiData";

export default function Footer() {
  const [CmdDesc, setCmdDesc] = useState();
  const [show, setshow] = useState();

  const AllCms = () => {
    ApiGet("cms/get-cms")
      .then((res) => {
        setCmdDesc(res.data.payload.Cms);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    AllCms();
  }, []);

  return (
    <>
      <footer>
        <div className="container-fluid">
          <div className="footer-alignment">
            <div className="copy-right">
              <p>
                LeaderBridge<sup>TM</sup> © 2020-2021. All Rights Reserved.
              </p>
            </div>
            <div className="footer-menu">
              <ul>
                {/* <Layout aboutpage={CmdDesc}/> */}

                {CmdDesc?.map((data) => {
                  return (
                    <>
                      {data.title == "About Us" && data.isActive == true && (
                        <>
                          {/* {data.isActive)} */}
                          {/* <Layout aboutpage={data.isActive}/> */}
                          {/* <NavLink
                            to="about"
                            target="_blank"
                            // to=""
                          > */}
                          <div
                            onClick={() =>
                              window.open("https://leaderbridge.com/about")
                            }
                          >
                            <li>About Us</li>
                          </div>
                          {/* </NavLink> */}
                        </>
                      )}

                      {data.title == "blog" && data.isActive == true && (
                        <>
                          <a
                            onClick={() =>
                              window.open("https://blog.leaderbridge.com/")
                            }
                          >
                            <li>Blog</li>
                          </a>
                        </>
                      )}

                      {data.title == "Privacy Policy" && data.isActive == true && (
                        <>
                          <NavLink to="/privacy" target="_blank">
                            <li
                              onClick={() =>
                                window.open("https://leaderbridge.com/privacy")
                              }
                            >
                              Privacy Policy
                            </li>
                          </NavLink>
                        </>
                      )}

                      {data.title == "Terms And Conditions" &&
                        data.isActive == true && (
                          <>
                            {/* <NavLink to="/terms" target="_blank"> */}
                            <li
                              onClick={() =>
                                window.open("https://leaderbridge.com/terms")
                              }
                            >
                              Terms of Services
                            </li>
                            {/* </NavLink> */}
                          </>
                        )}

                      {data.title == "Cookie Policy" && data.isActive == true && (
                        <>
                          {/* <NavLink to="/cookie" target="_blank"> */}
                          <li
                            onClick={() =>
                              window.open("https://leaderbridge.com/cookie")
                            }
                          >
                            Cookie Policy
                          </li>
                          {/* </NavLink> */}
                        </>
                      )}

                      {data.title == "Contact Us" && data.isActive == true && (
                        <>
                          {/* <NavLink to="/contact" target="_blank"> */}
                          <li
                            onClick={() =>
                              window.open("https://leaderbridge.com/contact")
                            }
                          >
                            Contact Us
                          </li>
                          {/* </NavLink> */}
                        </>
                      )}
                    </>
                  );
                })}
              </ul>
            </div>
            <div className="power-by"></div>
          </div>
        </div>
      </footer>
    </>
  );
}
