import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { ApiGet } from "../../Helpers/Api/ApiData";
import "./Notifications.scss";
import ReactTimeAgo from "react-time-ago";
import UserProfile from "../../Assets/Images/ProfileImg.png";
import Logo from "../../Assets/Images/logo.png";
import { useHistory } from "react-router";
import moment from "moment";
import useNotification from "./useNotification";

export default function Notifications() {
  const { getNotificationData, getNotificationCount, ClickBaleIcon, UserGetnotification, slectLoader, unseenMessage } = useNotification();
  const [allActiveNotifications, setAllActiveNotifications] = useState(getNotificationData);

  const history = useHistory();

  useEffect(() => {
    document.title = "Notifications | LeaderBridge";
    // getNotification();
    UserGetnotification();
  }, []);

  console.log("setSectLoader", slectLoader);
  const lableNotification = (notification) => {
    if (notification?.description?.notification?.title && notification?.description?.notification?.title) {
      if (notification?.description?.notification?.title !== "sent you a matching request.." || notification?.description?.notification?.title !== "New Matching Request!!!" || notification?.description?.notification?.title !== "Give you a chat message") {
        return;
        //  <span> &nbsp; {notification?.userId?.currentRole}</span>;
      } else {
        if (notification?.description?.notification?.title !== "Give you a chat message") {
          return <span>Someone &nbsp;</span>;
        }
      }
    }
  };

  const ImgNotification = (notification) => {
    if (!notification?.description?.notification?.title === "sent you the matching request." || !notification?.description?.notification?.title === "New Matching Request!!!") {
      if (notification?.isConnected === true && notification?.userId?.profileImage) {
        return <img src={notification?.userId?.profileImage} alt="UserProfile" />;
      } else {
        return <img src={UserProfile} alt="UserProfile" />;
      }
    } else {
      return <img src={Logo} alt="UserProfile" />;
    }
  };

  return (
    <>
      <section className="children-page-align">
        <div className="notification-section-align">
          <div className="container-fluid">
            <div className="container-grid">
              <div className="container-grid-items">
                <div className="notification-box">
                  <div className="heading-text">
                    <h3>Notifications</h3>
                  </div>
                  <div className="child-box">
                    <p>Manage your Notifications</p>
                    <NavLink to="/setting-page">
                      <span>Go to Settings</span>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="container-grid-items animate__animated animate__slideInUp wow" data-wow-offset="200">
                {slectLoader && (
                  <>
                    <div className="user-grid">
                      <div className="user-grid-items">
                        <div className="profile-image">
                          <Skeleton variant="circular" width={40} height={40} />
                        </div>
                      </div>
                      <div className="user-grid-items">
                        <p>
                          {" "}
                          <Skeleton variant="text" width={"80%"} height={25} />
                        </p>
                        <span>
                          <Skeleton variant="text" width={"60%"} height={25} />
                        </span>
                      </div>
                    </div>
                    <div className="user-grid">
                      <div className="user-grid-items">
                        <div className="profile-image">
                          <Skeleton variant="circular" width={40} height={40} />
                        </div>
                      </div>
                      <div className="user-grid-items">
                        <p>
                          {" "}
                          <Skeleton variant="text" width={"80%"} height={25} />
                        </p>
                        <span>
                          <Skeleton variant="text" width={"60%"} height={25} />
                        </span>
                      </div>
                    </div>
                    <div className="user-grid">
                      <div className="user-grid-items">
                        <div className="profile-image">
                          <Skeleton variant="circular" width={40} height={40} />
                        </div>
                      </div>
                      <div className="user-grid-items">
                        <p>
                          {" "}
                          <Skeleton variant="text" width={"80%"} height={25} />
                        </p>
                        <span>
                          <Skeleton variant="text" width={"60%"} height={25} />
                        </span>
                      </div>
                    </div>
                    <div className="user-grid">
                      <div className="user-grid-items">
                        <div className="profile-image">
                          <Skeleton variant="circular" width={40} height={40} />
                        </div>
                      </div>
                      <div className="user-grid-items">
                        <p>
                          {" "}
                          <Skeleton variant="text" width={"80%"} height={25} />
                        </p>
                        <span>
                          <Skeleton variant="text" width={"60%"} height={25} />
                        </span>
                      </div>
                    </div>
                    <div className="user-grid">
                      <div className="user-grid-items">
                        <div className="profile-image">
                          <Skeleton variant="circular" width={40} height={40} />
                        </div>
                      </div>
                      <div className="user-grid-items">
                        <p>
                          {" "}
                          <Skeleton variant="text" width={"80%"} height={25} />
                        </p>
                        <span>
                          <Skeleton variant="text" width={"60%"} height={25} />
                        </span>
                      </div>
                    </div>
                    <div className="user-grid">
                      <div className="user-grid-items">
                        <div className="profile-image">
                          <Skeleton variant="circular" width={40} height={40} />
                        </div>
                      </div>
                      <div className="user-grid-items">
                        <p>
                          {" "}
                          <Skeleton variant="text" width={"80%"} height={25} />
                        </p>
                        <span>
                          <Skeleton variant="text" width={"60%"} height={25} />
                        </span>
                      </div>
                    </div>
                    <div className="user-grid">
                      <div className="user-grid-items">
                        <div className="profile-image">
                          <Skeleton variant="circular" width={40} height={40} />
                        </div>
                      </div>
                      <div className="user-grid-items">
                        <p>
                          {" "}
                          <Skeleton variant="text" width={"80%"} height={25} />
                        </p>
                        <span>
                          <Skeleton variant="text" width={"60%"} height={25} />
                        </span>
                      </div>
                    </div>
                    <div className="user-grid">
                      <div className="user-grid-items">
                        <div className="profile-image">
                          <Skeleton variant="circular" width={40} height={40} />
                        </div>
                      </div>
                      <div className="user-grid-items">
                        <p>
                          {" "}
                          <Skeleton variant="text" width={"80%"} height={25} />
                        </p>
                        <span>
                          <Skeleton variant="text" width={"60%"} height={25} />
                        </span>
                      </div>
                    </div>
                    <div className="user-grid">
                      <div className="user-grid-items">
                        <div className="profile-image">
                          <Skeleton variant="circular" width={40} height={40} />
                        </div>
                      </div>
                      <div className="user-grid-items">
                        <p>
                          {" "}
                          <Skeleton variant="text" width={"80%"} height={25} />
                        </p>
                        <span>
                          <Skeleton variant="text" width={"60%"} height={25} />
                        </span>
                      </div>
                    </div>
                    <div className="user-grid">
                      <div className="user-grid-items">
                        <div className="profile-image">
                          <Skeleton variant="circular" width={40} height={40} />
                        </div>
                      </div>
                      <div className="user-grid-items">
                        <p>
                          {" "}
                          <Skeleton variant="text" width={"80%"} height={25} />
                        </p>
                        <span>
                          <Skeleton variant="text" width={"60%"} height={25} />
                        </span>
                      </div>
                    </div>

                    {/* <img src={https://ibb.co/Sf7KWQH} alt="user" /> */}
                    <a
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "500px",
                          height: "500px",
                          paddingTop: "5%",
                        }}
                      >
                        <img src="https://i.ibb.co/Y0TtYDJ/no-que.png" alt="no-que" border="0" />
                      </div>
                    </a>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "110px",
                        fontFamily: "Cursive",
                        fontSize: "20px",
                      }}
                    >
                      Notification not found
                    </p>
                  </>
                )}

                {!slectLoader && getNotificationData?.length === 0 && (
                  <div className="see-answer-grid-items animate__animated animate__slideInRight wow" data-wow-offset="200">
                    <div className="chat-list-answer-style center-align-image-no-data ">
                      <div className="no-answer-alignment">
                        <div className="no-answer-image-center">
                          <img src={require("../../Assets/Images/no-answer.svg").default} alt="img" />
                        </div>
                        <p>No notification available for you right now</p>
                      </div>
                    </div>
                  </div>
                )}
                {getNotificationData?.length > 0 &&
                  getNotificationData?.map((notification) => {
                    return (
                      <div
                        className="user-grid"
                        onClick={() => {
                          if (notification?.description?.notification?.body.includes("replied to your answer")) {
                            history.push({
                              pathname: "/see-answer",
                              state: {
                                questionId: notification?.question._id,
                                question: notification?.question,
                              },
                            });
                          } else if (notification?.description?.notification?.body.includes("sent you a connection request")) {
                            history.push({
                              pathname: "/connections",
                              state: {
                                type: "pending",
                              },
                            });
                          } else if (notification?.description?.notification?.body.includes("accepted your connections request")) {
                            history.push({
                              pathname: "/connections",
                              state: {
                                type: "total",
                              },
                            });
                          } else if (notification?.description?.notification?.body.includes("Give you a chat message")) {
                            history.push({
                              pathname: "/chat",
                            });
                          } else if (notification?.description?.notification?.body.includes("Replied To Your Question")) {
                            history.push({
                              pathname: `/answer/${notification?.question?._id}`,
                            });
                          }
                        }}
                      >
                        <div className="user-grid-items">
                          <div className="profile-image">
                            {notification && ImgNotification(notification)}
                            {/* {notification?.userId?.profileImage &&
                          notification?.isConnected === true ? (
                            <img
                              src={notification?.userId?.profileImage}
                              alt="UserProfile"
                            />
                          ) : (
                            <img src={UserProfile} alt="UserProfile" />
                          )} */}
                          </div>
                        </div>
                        <div className="user-grid-items">
                          <p>
                            {console.log(" notification?.description?.notification?.body", notification?.description?.notification?.body)}
                            {lableNotification(notification)}
                            &nbsp;
                            {notification?.description?.notification?.body && notification?.description?.notification?.body?.includes("Give you a chat message") ? "" : notification?.description?.notification?.body}
                          </p>
                          <span>
                            {/* <ReactTimeAgo
                            date={notification?.createdAt}
                            locale="en-US"
                            timeStyle="twitter-first-minute"
                          /> */}
                            {moment(notification?.createdAt).fromNow()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
